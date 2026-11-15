import { useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Forecast, toTime, DAY, formatShortDate, formatLongDate, BIOMARKER_NAMES, HERO_SIZE, } from "@/lib/forecast";
import Svg, { Circle, Defs, Line, LinearGradient, Polygon, Polyline, Rect, Stop, Text as SvgText } from "react-native-svg";
import { colors }          from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";

// ============================================================
// ForecastTrendCard.tsx
// Everything for the forecast chart card, plus the theme, types and helpers the other
// forecast components share (they import them from this file).
// ============================================================

// ---------- Range status ----------
// Where does the likely range for the next result sit against the normal range?
export type RangeStatus = "in" | "maybe" | "out";

export function rangeStatus(f: Forecast): RangeStatus {
  const { low, high } = f.normalRange;
  if (f.p10 >= low && f.p90 <= high) return "in";
  return f.p50 >= low && f.p50 <= high ? "maybe" : "out";
}

export const STATUS_LABEL: Record<RangeStatus, string> = {
  in: "In range",
  maybe: "Watch",
  out: "Outside",
};

// Everything for the forecast chart card: the chart, the card around it, the legend and the status pill.

// ---------- Chart ----------
// Past values as a line with a soft fill, plus the likely range for the NEXT result as a bar
// on the right. Tap any dot to see its value and date.
const HEIGHT = 290;
const PAD = { top: 36, right: 24, bottom: 40, left: 52 };

// Picks a tidy tick spacing for any unit (5.2 %, 118 mg/dL, 124 mmHg...).
const niceStep = (range: number) => {
  const pow = 10 ** Math.floor(Math.log10(range / 4));
  const n = range / 4 / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
};

/***
 * Renders the forecast chart for a given forecast.
 * @param forecast - The forecast data to display.
 * @returns The rendered chart component.
 */
function ForecastChart({ forecast }: { forecast: Forecast }) {
  const [width, setWidth] = useState(0);
  const [pickedDate, setPickedDate] = useState<string | null>(null);
  const { history, p10, p50, p90, normalRange, unit, asOf } = forecast;

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  // We only know the width after the first layout pass.
  if (width === 0) return <View onLayout={onLayout} style={{ height: HEIGHT }} />;

  const plotW = width - PAD.left - PAD.right;
  const plotH = HEIGHT - PAD.top - PAD.bottom;
  const baseY = HEIGHT - PAD.bottom;

  // X axis: first value (or 90 days back if there is none) -> as_of, plus room for the range bar
  const tAsOf = toTime(asOf);
  const tMin = history.length ? Math.min(toTime(history[0].date), tAsOf - 30 * DAY) : tAsOf - 90 * DAY;
  const tMax = tAsOf + (tAsOf - tMin) * 0.12;

  // Y axis: tick spacing adapts to the biomarker's unit
  const values = [...history.map((h) => h.value), p10, p50, p90, normalRange.low, normalRange.high];
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const step = niceStep(hi - lo);
  const yMin = Math.floor(lo / step) * step - step;
  const yMax = Math.ceil(hi / step) * step + step;

  const x = (t: number) => PAD.left + ((t - tMin) / (tMax - tMin)) * plotW;
  const y = (v: number) => PAD.top + (1 - (v - yMin) / (yMax - yMin)) * plotH;

  const ticks: number[] = [];
  for (let v = yMin; v <= yMax + step / 2; v += step) ticks.push(Math.round(v * 100) / 100);

  const barX = x(tAsOf);
  const latest = history.length ? history[history.length - 1] : null;
  const selected = history.find((h) => h.date === pickedDate) ?? latest;
  const linePts = history.map((h) => `${x(toTime(h.date))},${y(h.value)}`).join(" ");

  // X labels: first, latest, as_of (skip any that would crowd the next one)
  const xLabels: { t: number; text: string; anchor: "start" | "middle" | "end" }[] = [];
  if (history.length) xLabels.push({ t: toTime(history[0].date), text: formatShortDate(history[0].date), anchor: "start" });
  if (latest && history.length > 1) xLabels.push({ t: toTime(latest.date), text: formatShortDate(latest.date), anchor: "middle" });
  xLabels.push({ t: tAsOf, text: "Today", anchor: "middle" });
  const shown = xLabels.filter((l, i) => i === xLabels.length - 1 || x(xLabels[i + 1].t) - x(l.t) > 64);

  return (
    <View
      onLayout={onLayout}
      accessible
      accessibilityLabel={`Chart of your past values, with a likely range of ${p10} to ${p90} ${unit} for your next result.`}
    >
      <Svg width={width} height={HEIGHT}>
        <Defs>
          <LinearGradient id="histFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.primary} stopOpacity={0.2} />
            <Stop offset="1" stopColor={colors.primary} stopOpacity={0} />
          </LinearGradient>
        </Defs>

        {/* normal range */}
        <Rect x={PAD.left} y={y(normalRange.high)} width={plotW} height={y(normalRange.low) - y(normalRange.high)} fill={colors.successSoft} />
        <SvgText x={PAD.left + 8} y={y(normalRange.high) + 16} fontSize={fontsize.xs} fontFamily={fonts.regular} fill={colors.textMuted}>
          normal range
        </SvgText>

        {/* grid + y labels */}
        {ticks.map((t) => (
          <Line key={t} x1={PAD.left} x2={width - PAD.right} y1={y(t)} y2={y(t)} stroke={colors.border} strokeWidth={1} />
        ))}
        {ticks.map((t) => (
          <SvgText key={`l${t}`} x={PAD.left - 8} y={y(t) + 4} fontSize={fontsize.xs} fontFamily={fonts.regular} fill={colors.textMuted} textAnchor="end">
            {t}
          </SvgText>
        ))}
        <SvgText x={4} y={14} fontSize={fontsize.xs} fontFamily={fonts.regular} fill={colors.textMuted}>{unit}</SvgText>

        {/* past values: soft fill, line, dots */}
        {history.length > 1 && (
          <>
            <Polygon points={`${linePts} ${x(toTime(history[history.length - 1].date))},${baseY} ${x(toTime(history[0].date))},${baseY}`} fill="url(#histFill)" />
            <Polyline points={linePts} fill="none" stroke={colors.primary} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
          </>
        )}
        {latest && (
          <Line x1={x(toTime(latest.date))} y1={y(latest.value)} x2={barX} y2={y(p50)} stroke={colors.secondary} strokeWidth={1.5} strokeDasharray="5 4" />
        )}
        {history.map((h) => (
          <Circle key={h.date} cx={x(toTime(h.date))} cy={y(h.value)} r={h.date === selected?.date ? 7 : 5} fill={colors.primary} stroke={colors.surface} strokeWidth={2} />
        ))}
        {/* bigger invisible targets so dots are easy to tap */}
        {history.map((h) => (
          <Circle key={`t${h.date}`} cx={x(toTime(h.date))} cy={y(h.value)} r={18} fill="transparent" onPress={() => setPickedDate(h.date)} />
        ))}

        {/* likely range for the next result: p10 to p90, with the middle estimate marked */}
        <Rect x={barX - 14} y={y(p90)} width={28} height={y(p10) - y(p90)} rx={8} fill={colors.secondarySoft} stroke={colors.secondary} strokeWidth={1.5} />
        <Line x1={barX - 14} x2={barX + 14} y1={y(p50)} y2={y(p50)} stroke={colors.secondary} strokeWidth={3} />
        <SvgText x={barX + 14} y={16} fontSize={fontsize.xs} fontFamily={fonts.bold} fill={colors.secondaryInk} textAnchor="end">
          Likely next result
        </SvgText>

        {/* tooltip for the selected dot */}
        {selected && (() => {
          const valueLabel = `${selected.value} ${unit}`;
          const dateLabel = formatShortDate(selected.date);
          const w = Math.max(valueLabel.length, dateLabel.length) * 6.8 + 18;
          const px = x(toTime(selected.date));
          const py = y(selected.value);
          const tx = Math.min(Math.max(px - w / 2, PAD.left), width - PAD.right - w);
          const ty = py - 50 < 22 ? py + 20 : py - 50;
          return (
            <>
              <Rect x={tx} y={ty} width={w} height={36} rx={8} fill={colors.black1} opacity={0.7} />
              <SvgText x={tx + w / 2} y={ty + 14} fontSize={fontsize.xs} fontFamily={fonts.bold} fill={colors.surface} textAnchor="middle">
                {valueLabel}
              </SvgText>
              <SvgText x={tx + w / 2} y={ty + 29} fontSize={fontsize.xs} fontFamily={fonts.regular} fill={colors.surface} opacity={0.8} textAnchor="middle">
                {dateLabel}
              </SvgText>
            </>
          );
        })()}

        {/* x labels */}
        {shown.map((l) => (
          <SvgText key={l.t} x={x(l.t)} y={HEIGHT - 12} fontSize={fontsize.xs} fontFamily={fonts.regular} fill={colors.textMuted} textAnchor={l.anchor}>
            {l.text}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

// ---------- Card ----------
// "In range" / "Watch" / "Outside" badge, used here and on the biomarker tiles.
export function StatusPill({ status, small }: { status: RangeStatus; small?: boolean }) {
  const good = status === "in";
  return (
    <View style={[styles.pill, small && styles.pillSmall, { backgroundColor: good ? colors.successSoft : colors.warningSoft }]}>
      <View style={[styles.dot, { backgroundColor: good ? colors.success : colors.warning }]} />
      <Text style={[styles.pillText, small && { fontSize: fontsize.xs }]}>{STATUS_LABEL[status]}</Text>
    </View>
  );
}

const RANGES = [
  { key: "6M",  days: 182 },
  { key: "1Y",  days: 365 },
  { key: "All", days: null },
] as const;

const DETAIL: Record<"in" | "maybe" | "out", [string, string]> = {
  in:    ["Likely in range. "                , "Your next result is expected to land within the normal range."],
  maybe: ["Probably in range. "              , "Your next result is most likely within the normal range, but it could land outside it."],
  out:   ["Likely outside the normal range. ", "Your next result is expected to land outside the normal range."],
};

type ForecastTrendCardProps = {
  forecasts: Forecast[];
  selectedId: string;
  onSelect: (id: string) => void;
  onUploadLab: () => void;
};

/***
 * Renders a card displaying the forecast trend for a selected biomarker, including a chart, status, and time range selection.
 * @param forecasts - An array of forecast data for different biomarkers.
 * @param selectedId - The ID of the currently selected biomarker forecast.
 */
export default function ForecastTrendCard({ forecasts, selectedId, onSelect, onUploadLab }: ForecastTrendCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [range, setRange]       = useState<(typeof RANGES)[number]["key"]>("All");

  const forecast = forecasts.find((f) => f.id === selectedId) ?? forecasts[0];
  const names    = BIOMARKER_NAMES[forecast.biomarker];
  const { p10, p50, p90, unit, change } = forecast;

  // The time-range chips only change which past values the chart shows.
  const days   = RANGES.find((r) => r.key === range)?.days;
  const cutoff = days ? toTime(forecast.asOf) - days * DAY : -Infinity;
  const shown: Forecast = { ...forecast, history: forecast.history.filter((h) => toTime(h.date) >= cutoff) };

  const status = rangeStatus(forecast);
  const good   = status === "in";
  const [lead, detail] = DETAIL[status];

  return (
    <View style={styles.card}>
      {/* title doubles as a dropdown to switch biomarker */}
      <View style={styles.titleWrap}>
        <Pressable
          style={styles.titleRow}
          onPress={() => setMenuOpen((o) => !o)}
          accessibilityRole="button"
          accessibilityLabel="Choose a biomarker"
          accessibilityState={{ expanded: menuOpen }}
        >
          <Text style={styles.title}>{names.full}</Text>
          <Ionicons name={menuOpen ? "chevron-up" : "chevron-down"} size={20} color={colors.text} />
        </Pressable>

        {menuOpen && (
          <View style={styles.menu}>
            <Text style={styles.menuLabel}>YOUR BIOMARKERS</Text>
            {forecasts.map((f) => {
              const on = f.id === forecast.id;
              return (
                <Pressable
                  key={f.id}
                  style={[styles.mencolorstem, on && styles.mencolorstemOn]}
                  onPress={() => {
                    onSelect(f.id);
                    setMenuOpen(false);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                >
                  <View>
                    <Text style={styles.menuName}>{BIOMARKER_NAMES[f.biomarker].full}</Text>
                    <Text style={styles.menuMeta}>
                      Expected {f.p50} {f.unit} · {f.basisLabel}
                    </Text>
                  </View>
                  {on && <Ionicons name="checkmark" size={18} color={colors.primary} />}
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      <Text style={styles.sub}>Expected range for your next result · as of {formatLongDate(forecast.asOf)}</Text>

      {/* the answer first: big number, status, and how it changed */}
      <View style={styles.hero}>
        <View>
          <Text style={styles.heroValue}>
            {p50}
            <Text style={styles.heroUnit}> {unit}</Text>
          </Text>
          <Text style={styles.heroRange}>
            Likely range {p10}–{p90} {unit}
          </Text>
        </View>
        <View style={styles.heroRight}>
          <StatusPill status={status} />
          {change && (
            <View style={styles.delta}>
              <Ionicons name={change.percentChange >= 0 ? "arrow-up" : "arrow-down"} size={14} color={colors.textMuted} />
              <Text style={styles.deltaText}>
                {Math.abs(change.percentChange)}% since {formatShortDate(change.previousMeasuredAt)}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* time range */}
      <View style={styles.rangeRow}>
        {RANGES.map((r) => (
          <Pressable
            key={r.key}
            onPress={() => setRange(r.key)}
            style={[styles.chip, range === r.key && styles.chipOn]}
            accessibilityRole="button"
            accessibilityState={{ selected: range === r.key }}
          >
            <Text style={[styles.chipText, range === r.key && styles.chipTextOn]}>{r.key}</Text>
          </Pressable>
        ))}
      </View>

      <ForecastChart forecast={shown} />

      {/* legend */}
      <View style={styles.legend}>
        <LegendItem color={colors.primary} label="Past values" />
        <LegendItem color={colors.secondarySoft} label="Likely next result" box />
        <LegendItem color={colors.successSoft} label="normal range" box />
      </View>

      {/* insight */}
      <View style={[styles.status, { backgroundColor: good ? colors.successSoft : colors.warningSoft }]}>
        <Ionicons name={good ? "checkmark-circle" : "alert-circle"} size={22} color={good ? colors.success : colors.intermediate} />
        <Text style={styles.statusText}>
          <Text style={{ fontFamily: fonts.bold }}>{lead}</Text>
          {detail}
        </Text>
      </View>

      {/* where this estimate comes from */}
      <Text style={styles.meta}>
        {forecast.basisLabel}
        {forecast.labMeasuredAt ? ` · Last result ${formatLongDate(forecast.labMeasuredAt)}` : ""}
        {change?.significant ? " · Changed more than normal variation" : ""}
      </Text>
      {forecast.basis === "population" && (
        <Pressable onPress={onUploadLab} accessibilityRole="link">
          <Text style={styles.link}>Upload a lab to base this on you</Text>
        </Pressable>
      )}
    </View>
  );
}

function LegendItem({ color, label, box }: { color: string; label: string; box?: boolean }) {
  return (
    <View style={styles.legendItem}>
      <View style={{ width: 24, height: box ? 12 : 3, borderRadius: box ? 2 : 0, backgroundColor: color }} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 24},
  titleWrap: { position: "relative", zIndex: 20, alignSelf: "flex-start" },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 10, minHeight: 20 },
  title: { fontFamily: fonts.bold, fontSize: fontsize.xl, color: colors.text },
  menu: { position: "absolute", top: 48, left: 0, minWidth: 400, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingVertical: 6, elevation: 6 },
  menuLabel: { paddingHorizontal: 16, paddingVertical: 8, fontFamily: fonts.bold, fontSize: fontsize.xs, color: colors.textMuted },
  mencolorstem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, paddingHorizontal: 16, paddingVertical: 10 },
  mencolorstemOn: { backgroundColor: colors.primarySoft },
  menuName: { fontFamily: fonts.bold, fontSize: fontsize.md, color: colors.text },
  menuMeta: { fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
  sub: { marginTop: 2, fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
  hero: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 12, marginTop: 16 },
  heroValue: { fontFamily: fonts.bold, fontSize: HERO_SIZE, color: colors.text },
  heroUnit: { fontFamily: fonts.regular, fontSize: fontsize.lg, color: colors.textMuted },
  heroRange: { fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
  heroRight: { alignItems: "flex-end", gap: 8 },
  pill: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 999 },
  pillSmall: { paddingVertical: 2, paddingHorizontal: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  pillText: { fontFamily: fonts.bold, fontSize: fontsize.sm, color: colors.warningInk },
  delta: { flexDirection: "row", alignItems: "center", gap: 4 },
  deltaText: { fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
  rangeRow: { flexDirection: "row", gap: 6, marginTop: 16 },
  chip: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 999, backgroundColor: colors.panel },
  chipOn: { backgroundColor: colors.primary },
  chipText: { fontFamily: fonts.bold, fontSize: fontsize.sm, color: colors.primary },
  chipTextOn: { color: colors.surface },
  legend: { flexDirection: "row", flexWrap: "wrap", gap: 20, marginTop: 4, marginLeft: 44 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  legendText: { fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
  status: { flexDirection: "row", gap: 12, alignItems: "flex-start", marginTop: 20, padding: 16, borderRadius: 12 },
  statusText: { flex: 1, fontFamily: fonts.regular, fontSize: fontsize.md, lineHeight: 24, color: colors.text },
  meta: { marginTop: 14, fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
  link: { marginTop: 8, fontFamily: fonts.bold, fontSize: fontsize.sm, color: colors.primary },
});