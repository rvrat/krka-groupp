document.addEventListener('DOMContentLoaded', function () {
  const FORM_ID = "60ROM";

  // Маска телефона
  const phoneInput = document.getElementById('fphone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let value = e.target.value;
      if (!value.startsWith('+7')) {
        e.target.value = '+7';
        return;
      }
      let numbers = value.replace(/[^\d]/g, '');
      let formatted = '+7';
      let rest = numbers.slice(1, 11);
      if (rest.length > 0) {
        if (rest.length <= 3) formatted += ' (' + rest;
        else if (rest.length <= 6) formatted += ' (' + rest.slice(0, 3) + ') ' + rest.slice(3);
        else formatted += ' (' + rest.slice(0, 3) + ') ' + rest.slice(3, 6) + '-' + rest.slice(6, 8) + '-' + rest.slice(8, 10);
      }
      e.target.value = formatted;
    });
  }

  // Отправка формы
  const submitBtn = document.getElementById('submitBtn');
  const formDiv = document.getElementById('contactForm');
  const successDiv = document.getElementById('successMsg');
  const errorDiv = document.getElementById('errorMsg');

  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      const name = document.getElementById('fname').value.trim();
      const phone = document.getElementById('fphone').value.trim();
      const service = document.getElementById('fservice').value || 'Не выбрана';
      const message = document.getElementById('fmsg').value.trim() || 'Не указано';

      if (!name) { alert('Введите имя'); return; }

      const digits = phone.replace(/\D/g, '');
      if (digits.length < 11) { alert('Введите номер телефона полностью'); return; }

      errorDiv.style.display = 'none';

      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправляем...';

      fetch('https://formbold.com/s/' + FORM_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, service, message })
      })
        .then(function (response) {
          if (response.ok) {
            formDiv.style.display = 'none';
            successDiv.style.display = 'block';
          } else {
            errorDiv.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку →';
          }
        })
        .catch(function () {
          errorDiv.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Отправить заявку →';
        });
    });
  }
});
