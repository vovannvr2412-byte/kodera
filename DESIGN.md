# Design System

## Theme

Тёмная графитовая тема с одним оранжевым акцентом. Страница сохраняет единый тёмный режим без инверсии секций.

## Color

- Background: `#090a0d`
- Elevated surface: `#101217`
- Secondary surface: `#15171d`
- Primary text: `#f3f4f6`
- Muted text: `#9297a3`
- Border: `#252831`
- Accent: `#ff7418`
- Accent soft: `#ff9b55`
- Success: `#4bd08b`

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
