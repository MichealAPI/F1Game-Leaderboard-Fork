let lightWrapper = document.getElementById('lights-container');
const numberOfLightCircles = 4;
const numberOfLights = 3;

for (let i = 0; i < numberOfLights; i++) {
    let light = document.createElement('div');
    light.classList.add('light');

    for (let j = numberOfLightCircles; j > 0; j--) {
        light.innerHTML += `<div class="row-${j} light-circle primary-light"></div>`;
    }
    
    // Adaptive height, cannot use due to the figma design constraints
    // light.style.height = 76 * numberOfLightCircles + 'px';

    lightWrapper.appendChild(light);
}