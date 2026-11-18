import { useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Polyline } from "react-native-svg";
import { rangeStatus, StatusPill, STATUS_LABEL } from "@/components/ForecastTrendCard";
import type { Forecast } from "@/lib/forecast";
import { BIOMARKER_NAMES } from "@/lib/forecast";
import { colors } from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";

// ---------- Sparkline ----------
const H = 40;

// A tiny trend: past values on the left, the expected next result (a teal range) at the right edge.
function Sparkline({ forecast }: { forecast: Forecast }) {
  const [w, setW] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width);
  if (w === 0) return <View onLayout={onLayout} style={{ height: H }} />;

  const { history, p10, p50, p90 } = forecast;
  const values = [...history.map((h) => h.value), p10, p90];
  const lo = Math.min(...values);
  const span = Math.max(...values) - lo || 1;
  const y = (v: number) => 6 + (1 - (v - lo) / span) * (H - 12);

  const endX = w - 8;
  const n = history.length;
  const hx = (i: number) => 4 + (n > 1 ? i / (n - 1) : 0) * (w * 0.76);
  const last = n ? { x: hx(n - 1), y: y(history[n - 1].value) } : null;

  return (
    <View onLayout={onLayout}>
      <Svg width={w} height={H}>
        {n > 1 && (
          <Polyline
            points={history.map((h, i) => `${hx(i)},${y(h.value)}`).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
        {last && <Line x1={last.x} y1={last.y} x2={endX} y2={y(p50)} stroke={colors.secondary} strokeWidth={1.5} strokeDasharray="3 3" />}
        <Line x1={endX} x2={endX} y1={y(p90)} y2={y(p10)} stroke={colors.secondarySoft} strokeWidth={8} strokeLinecap="round" />
        <Circle cx={endX} cy={y(p50)} r={3.5} fill={colors.secondary} />
      </Svg>
    </View>
  );
}

// ---------- Tiles ----------
type Props = { forecasts: Forecast[]; selectedId: string; onSelect: (id: string) => void };

// One tile per biomarker: the whole picture at a glance. Tap one to see its chart.
export default function BiomarkerTiles({ forecasts, selectedId, onSelect }: Props) {
  return (
    <View style={styles.grid}>
      {forecasts.map((f) => {
        const on = f.id === selectedId;
        const status = rangeStatus(f);
        const name = BIOMARKER_NAMES[f.biomarker].short;
        return (
          <Pressable
            key={f.id}
            style={[styles.tile, on && styles.tileOn]}
            onPress={() => onSelect(f.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={`${name}, expected ${f.p50} ${f.unit}, ${STATUS_LABEL[status]}`}
          >
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.value}>
              {f.p50}
              <Text style={styles.unit}> {f.unit}</Text>
            </Text>
            <View style={{ alignSelf: "flex-start" }}>
              <StatusPill status={status} small />
            </View>
            <Sparkline forecast={f} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 20 },
  tile: { width: 168, padding: 14, gap: 6, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16 },
  tileOn: { borderColor: colors.primary, backgroundColor: colors.panel },
  name: { fontFamily: fonts.bold, fontSize: fontsize.sm, color: colors.textMuted },
  value: { fontFamily: fonts.bold, fontSize: fontsize.xl, color: colors.text },
  unit: { fontFamily: fonts.regular, fontSize: fontsize.xs, color: colors.textMuted },
});