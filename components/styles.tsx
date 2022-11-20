import { MantineTheme } from "@mantine/core";

export const gradientText = (theme: MantineTheme) => ({ background: theme.fn.gradient({ from: 'staymta', to: 'red' }), WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' })