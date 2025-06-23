const form = document.querySelector(".feedback-form")

const STORAGE_KEY = "feedback-form-state";

let formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };
    if (form.elements.email) {
      form.elements.email.value = formData.email || '';
    }
    if (form.elements.message) {
      form.elements.message.value = formData.message || '';
    }
  } catch (error) {
    console.error('Error parsing saved data:', error);
  }
}


form.addEventListener('input', (event) => {
  const { name, value } = event.target;
  formData[name] = value.trimStart(); 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email.trim() || !message.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});