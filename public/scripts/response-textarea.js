$(document).ready(() => {

  $('textarea').on('input', function() {
    this.style.height = '';
    this.style.height = this.scrollHeight + 'px';
  });
});