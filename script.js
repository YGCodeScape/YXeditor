let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"  
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%" 
    },
    hueRotation:  {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 200,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
}

const filtersContainer = document.querySelector(".filters");
const imgCanvas = document.querySelector("#img-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imgCanvas.getContext("2d");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
let currentImage = null 

function createFiltersElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event) => {
        filters[name].value = input.value
        applyFilters()
    })

    return div
}
createFiltersElement();

// APPEND ALL FILTERS TO THE FILTERS DIV ACCORDING TO FILTERS OBJECT 
function createFilters() {
    Object.keys(filters).forEach(key => {
       const filterElement = createFiltersElement(key, filters[ key ].unit, filters[key].value, filters[key].min, filters[key].max)
       filtersContainer.appendChild(filterElement)
    })
}
createFilters()
// SHOWCASE THE SELECTED IMG TO THE CANVAS AREA
imgInput.addEventListener("change", (event) => {

    const imgPlaceholder = document.querySelector(".placeholder")
    imgPlaceholder.style.display = "none"

    const file = event.target.files[ 0 ]
    
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        currentImage = img 
        imgCanvas.width = img.width
        imgCanvas.height = img.height
        canvasCtx.drawImage(img, 0, 0)
    }
})

// APPLY FILTERS 
function applyFilters() {
    if (!currentImage) return

    const f = filters
    const filterStr = [
        `brightness(${f.brightness.value}${f.brightness.unit})`,
        `contrast(${f.contrast.value}${f.contrast.unit})`,
        `saturate(${f.saturation.value}${f.saturation.unit})`,
        `hue-rotate(${f.hueRotation.value}${f.hueRotation.unit})`,
        `blur(${f.blur.value}${f.blur.unit})`,
        `grayscale(${f.grayscale.value}${f.grayscale.unit})`,
        `sepia(${f.sepia.value}${f.sepia.unit})`,
        `opacity(${f.opacity.value}${f.opacity.unit})`,
        `invert(${f.invert.value}${f.invert.unit})`
    ].join(" ")

    canvasCtx.filter = filterStr
    canvasCtx.clearRect(0, 0, imgCanvas.width, imgCanvas.height)
    canvasCtx.drawImage(currentImage, 0, 0)
}

resetBtn.addEventListener("click", () => {
 filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"  
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%" 
    },
    hueRotation:  {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 200,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    }
    applyFilters();

    filtersContainer.innerHTML = ""
    createFilters()
})

downloadBtn.addEventListener("click", () => {
    console.log("download");
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imgCanvas.toDataURL()
    link.click()
})