let lightWrapper = document.getElementById('lights-container');

for (let i = 0; i < 3; i++) {
    let light = document.createElement('div');
    light.classList.add('light');

    light.innerHTML = `<div class="third-row light-circle primary-light"></div>
                        <div class="second-row light-circle primary-light"></div>
                        <div class="first-row light-circle primary-light"></div>
                      `;

    lightWrapper.appendChild(light);
}