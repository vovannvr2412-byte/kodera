# Design System

## Theme

Тёмная индиго-тема Kodera с неоновой фиолетово-циановой айдентикой. Страница сохраняет единый тёмный режим без инверсии секций.

## Color

- Background: `oklch(11% 0.025 285)`
- Elevated surface: `oklch(16% 0.035 285)`
- Secondary surface: `oklch(20% 0.045 285)`
- Primary text: `oklch(96% 0.015 285)`
- Muted text: `oklch(76% 0.035 285)`
- Border: `oklch(30% 0.07 285)`
- Primary accent: `oklch(66% 0.25 305)`
- Cyan accent: `oklch(79% 0.15 205)`
- Success: `oklch(78% 0.15 160)`

## Typography

- Primary: Manrope, sans-serif
- Technical labels: JetBrains Mono, monospace
- Display headings: 700-800 weight, tight but not below `-0.04em`

## Shape

- Cards and sections: 16px radius
- Inputs: 10px radius
- Buttons and chips: 10px radius, pills only for compact tags

## Layout

- Content width: 1200px
- Desktop hero: asymmetric two-column composition
- Mobile: strict single column with a persistent bottom action bar
- Section spacing: 88-120px desktop, 64-84px mobile

## Motion

Subtle reveal on entry, carousel scrolling, accordion transitions and tactile button states. All non-essential motion is disabled for `prefers-reduced-motion`.
