var copyToClipboardButton = document.querySelector('button#c2c');
var copyToClipboardStatusContainer = document.querySelector('#clipboard-status');
var bogpostFormat = copyToClipboardButton.getAttribute('data-bogpost-format')

copyToClipboardButton.addEventListener('click', copyToClipboard)

var selector = '.copypasta p'
var joiner = '\n\n'

if (bogpostFormat === 'canticle') {
  selector = '.copypasta';
} else if (bogpostFormat === 'protocol') {
  selector = '.copypasta p, .protocol li'
} else if (bogpostFormat === 'rundown') {
  joiner = '\n';
}

function copyToClipboard () {
  var copiedText = Array.from(document.querySelectorAll(selector))
    .map(function (node) {
      return node.innerText;
    })
    .join(joiner);


  navigator.clipboard.writeText(copiedText).then(
    function () {
      /* clipboard successfully set */
      copyToClipboardStatusContainer.removeAttribute('data-failed');
      copyToClipboardStatusContainer.textContent = 'Copied to Clipboard!';
    },
    function () {
      /* clipboard write failed */
      copyToClipboardStatusContainer.setAttribute('data-failed', true);
      copyToClipboardStatusContainer.textContent = 'Failed to Copy to Clipboard :(';
    },
  )
}
