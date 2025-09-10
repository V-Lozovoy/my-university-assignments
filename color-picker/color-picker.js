const colorSlider = document.getElementById("colorSlider");
const colorSquare = document.getElementById("colorSquare");
const transparencySlider = document.getElementById("transparencySlider");
const hexCode = document.getElementById("hexCode");
let cursor = null;
let cursorFixed = false;
let lastSelectedColor = null;

colorSlider.addEventListener("input", updateColor);
transparencySlider.addEventListener("input", updateColor);
colorSquare.addEventListener("mousemove", showColorInfo);
colorSquare.addEventListener("click", toggleCursorFix);
colorSquare.addEventListener("mouseleave", hideColorInfo);

function updateColor() {
    const hue = colorSlider.value % 360;
    const saturation = 100;
    const l = 50;
    const transparency = transparencySlider.value / 100;

    colorSquare.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${l}%, ${transparency})`;

    const palette = generateColorPalette(hue, saturation, l, transparency);
    colorSquare.style.background = `linear-gradient(to top, ${palette})`;

    const hex = hslToHex(hue, saturation, l);
    hexCode.textContent = "HEX: " + hex;

    if (cursorFixed) {
        lastSelectedColor = hex;
    }
}

function showColorInfo(event) {
    const rect = colorSquare.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hue = colorSlider.value % 360;
    const saturation = x / rect.width * 100;
    const l = (1 - y / rect.height) * 100;

    const selectedColor = `hsl(${hue}, ${saturation}%, ${l}%)`;
    const hex = hslToHex(hue, saturation, l);
    hexCode.textContent = "HEX: " + hex;

    if (cursorFixed) {
        return;
    }

    if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursor.style.backgroundColor = selectedColor;
        cursor.dataset.color = hex; // Set the data-color attribute
    } else {
        createCursor(x, y, selectedColor, hex); // Pass the hex value to createCursor function
    }
}

function createCursor(x, y, selectedColor) {
    cursor = document.createElement("div");
    cursor.className = "cursor";
    colorSquare.appendChild(cursor);

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.backgroundColor = selectedColor;
}

function toggleCursorFix() {
    cursorFixed = !cursorFixed;

    if (cursorFixed) {
        colorSquare.removeEventListener("mousemove", showColorInfo);
        colorSquare.style.cursor = "default";
        if (cursor) {
            lastSelectedColor = cursor.dataset.color;
        }
        hexCode.textContent = "HEX: " + lastSelectedColor;
    } else {
        colorSquare.addEventListener("mousemove", showColorInfo);
        colorSquare.style.cursor = "crosshair";
        hexCode.textContent = "HEX: ";
    }
}

function hideColorInfo() {
    if (cursorFixed) {
        return;
    }
    if (cursor) {
        cursor.remove();
        cursor = null;
    }
    hexCode.textContent = "HEX: " + lastSelectedColor;
}

function generateColorPalette(hue, saturation, l, transparency) {
    const steps = 100;
    let palette = "";

    for (let i = 0; i < steps; i++) {
        const l = i / steps * 100;
        const color = `hsla(${hue}, ${saturation}%, ${l}%, ${transparency})`;

        if (i === steps - 1) {
            palette += color;
        } else {
            palette += color + ", ";
        }
    }

    return palette;
}

function hslToHex(h, s, l) {
    const hslToRgb = (h, s, l) => {
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        let r, g, b;

        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else {
            r = c;
            g = 0;
            b = x;
        }
        return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
    };

    const componentToHex = (c) => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    const [r, g, b] = hslToRgb(h, s / 100, l / 100);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
updateColor();