import './style.css';

function component() {
  const element = document.createElement('div');
  element.classList.add('test');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello Webpack!';

  return element;
}

document.body.appendChild(component());
