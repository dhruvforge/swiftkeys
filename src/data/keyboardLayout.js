// Shared QWERTY layout used by the live MiniKeyboard and the KeyHeatmap.
// Each key: physical event.code + the label shown. `w` is a flex-grow
// multiplier so wider keys (Backspace, Shift, Space…) look right.
export const ROWS = [
  [
    { code: 'Backquote', label: '`' },
    { code: 'Digit1', label: '1' }, { code: 'Digit2', label: '2' },
    { code: 'Digit3', label: '3' }, { code: 'Digit4', label: '4' },
    { code: 'Digit5', label: '5' }, { code: 'Digit6', label: '6' },
    { code: 'Digit7', label: '7' }, { code: 'Digit8', label: '8' },
    { code: 'Digit9', label: '9' }, { code: 'Digit0', label: '0' },
    { code: 'Minus', label: '-' }, { code: 'Equal', label: '=' },
    { code: 'Backspace', label: '⌫', w: 2 },
  ],
  [
    { code: 'Tab', label: 'tab', w: 1.5 },
    { code: 'KeyQ', label: 'q' }, { code: 'KeyW', label: 'w' },
    { code: 'KeyE', label: 'e' }, { code: 'KeyR', label: 'r' },
    { code: 'KeyT', label: 't' }, { code: 'KeyY', label: 'y' },
    { code: 'KeyU', label: 'u' }, { code: 'KeyI', label: 'i' },
    { code: 'KeyO', label: 'o' }, { code: 'KeyP', label: 'p' },
    { code: 'BracketLeft', label: '[' }, { code: 'BracketRight', label: ']' },
    { code: 'Backslash', label: '\\', w: 1.5 },
  ],
  [
    { code: 'CapsLock', label: 'caps', w: 1.75 },
    { code: 'KeyA', label: 'a' }, { code: 'KeyS', label: 's' },
    { code: 'KeyD', label: 'd' }, { code: 'KeyF', label: 'f' },
    { code: 'KeyG', label: 'g' }, { code: 'KeyH', label: 'h' },
    { code: 'KeyJ', label: 'j' }, { code: 'KeyK', label: 'k' },
    { code: 'KeyL', label: 'l' }, { code: 'Semicolon', label: ';' },
    { code: 'Quote', label: "'" },
    { code: 'Enter', label: '↵', w: 2.25 },
  ],
  [
    { code: 'ShiftLeft', label: '⇧', w: 2.25 },
    { code: 'KeyZ', label: 'z' }, { code: 'KeyX', label: 'x' },
    { code: 'KeyC', label: 'c' }, { code: 'KeyV', label: 'v' },
    { code: 'KeyB', label: 'b' }, { code: 'KeyN', label: 'n' },
    { code: 'KeyM', label: 'm' }, { code: 'Comma', label: ',' },
    { code: 'Period', label: '.' }, { code: 'Slash', label: '/' },
    { code: 'ShiftRight', label: '⇧', w: 2.25 },
  ],
  [
    { code: 'Space', label: '', w: 12 },
  ],
]
