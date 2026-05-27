document.addEventListener('DOMContentLoaded', function() {
  const FORM_ID = "60ROM";
  
  const phoneInput = document.getElementById('fphone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value;
      if (!value.startsWith('+7')) {
        e.target.value = '+7';
        return;
      }
      let numbers = value.replace(/[^\d]/g, '');
      let formatted = '+7';
      let restNumbers = numbers.slice(1, 11);
      if (restNumbers.length > 0) {
        if (restNumbers.length <= 3) formatted += ' (' + restNumbers;
        else if (restNumbers.length <= 6) formatted += ' (' + restNumbers.slice(0, 3) + ') ' + restNumbers.slice(3);
        else formatted += ' (' + restNumbers.slice(0, 3) + ') ' + restNumbers.slice(3, 6) + '-' + restNumbers.slice(6, 8) + '-' + restNumbers.slice(8, 10);
      }
      e.target.value = formatted;
    });
  }

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successDiv = document.getElementById('successMsg');
  const errorDiv = document.getElementById('errorMsg');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('fname').value.trim();
      const phone = document.getElementById('fphone').value.trim();
      const service = document.getElementById('fservice').value || 'Не выбрана';
      const message = document.getElementById('fmsg').value.trim() || 'Не указано';

      if (!name) { alert('Введите имя'); return; }
      if (phone.length < 5) { alert('Введите номер полностью'); return; }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправляем...';

      fetch('https://formbold.com/s/' + FORM_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          phone: phone,
          service: service,
          message: message
        })
      })
      .then(function(response) {
        if (response.ok) {
          form.style.display = 'none';
          successDiv.style.display = 'block';
        } else {
          errorDiv.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Отправить заявку →';
        }
      })
      .catch(function() {
        errorDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить заявку →';
      });
    });
  }
});