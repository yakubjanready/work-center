const apiKey = 'YOUR_API_KEY'; // API kalitini kiritish

// Oldindan belgilangan savollar va javoblar
const predefinedQuestions = {
    "What is the company phone number?": "+99890444444",
    "Where are you located?": "We are located in Tashkent, Uzbekistan.",
    "What services do you offer?": "We offer coworking spaces, private offices, and meeting rooms.",
    "What are your business hours?": "Our business hours are from 9 AM to 6 PM, Monday to Friday.",
    "Can I book a meeting room?": "Yes, you can book a meeting room by contacting us.",
    "Do you offer free Wi-Fi?": "Yes, free Wi-Fi is available in all our spaces."
};

// OpenAI'ga so'rov yuborish
async function sendToOpenAI(message) {
    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: message,
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        return "Sorry, I couldn't process your request. Please try again.";
    }
}

// Oldindan belgilangan savollarga javob berish
function getPredefinedAnswer(question) {
    return predefinedQuestions[question.toLowerCase()] || null;
}

// Javoblarni ko'rsatish funksiyasi
function appendMessage(message, sender) {
    const chatContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = (sender === 'user' ? "You: " : "AI: ") + message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// "Send" tugmasini bosganda ishlash
document.getElementById('sendBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput) {
        appendMessage(userInput, 'user');

        // Oldindan belgilangan savollarni tekshirish
        const predefinedAnswer = getPredefinedAnswer(userInput);
        if (predefinedAnswer) {
            appendMessage(predefinedAnswer, 'bot');
        } else {
            // OpenAI API'ga murojaat qilish
            const aiResponse = await sendToOpenAI(userInput);
            appendMessage(aiResponse, 'bot');
        }
        document.getElementById('userInput').value = '';
    }
});

// Enter tugmasini qo'llab-quvvatlash
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('sendBtn').click();
    }
});

// Chatbotni kichraytirish va yopish
document.getElementById('closeBtn').addEventListener('click', () => {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.classList.toggle('shrunk');
    if (!chatbotContainer.classList.contains('shrunk')) {
        setTimeout(() => {
            appendMessage("Hello! How can I help you?", "bot");
        }, 300);  // New message appears after shrinking back
    }
});

// Initially show the welcome message
appendMessage("Hello! How can I help you?", "bot");

// Elementlarni tanlash
const languageSelector = document.querySelector('.language-selector');
const languageBtn = document.querySelector('.language-btn');
const languageOptions = document.querySelectorAll('.language-options a');

// Til ro‘yxatini ochish va yopish
languageBtn.addEventListener('click', () => {
    languageSelector.classList.toggle('active');
});

// Tilni tanlash va sayt tilini o‘zgartirish
languageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();

        // Tanlangan til kodi
        const selectedLang = option.getAttribute('data-lang');
        
        // Tanlangan tilni ko‘rsatish
        languageBtn.textContent = option.textContent;

        // Sayt tilini o‘zgartirish
        changeLanguage(selectedLang);

        // Ro‘yxatni yopish
        languageSelector.classList.remove('active');
    });
});

// Tilni o'zgartirish funksiyasi
function changeLanguage(lang) {
    // Bu yerda til o'zgarishiga mos amallarni qo'shishingiz mumkin
    console.log(`Selected language: ${lang}`);
    // Masalan, tilga mos matnlarni yuklash yoki boshqa amallar
}


const blogContainer = document.getElementById('blog-container');
const loadMoreButton = document.getElementById('loadMore');
const loadLessButton = document.getElementById('loadLess');

const extraBlogs = [
  {
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c',
    title: 'Why Coworking Spaces are Thriving',
    description: 'Explore the reasons behind the growing popularity of coworking spaces.',
    link: '#',
  },
  {
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786',
    title: 'Time Management Tips for Entrepreneurs',
    description: 'Master your time with these effective tips for entrepreneurs.',
    link: '#',
  },
];

loadMoreButton.addEventListener('click', () => {
  extraBlogs.forEach(blog => {
    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card');
    blogCard.innerHTML = `
      <img src="${blog.img}" alt="${blog.title}" class="blog-img">
      <div class="blog-content">
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
        <a href="${blog.link}" class="read-more">Read More</a>
      </div>
      

    `;
    blogContainer.appendChild(blogCard);
  });

  // "More" tugmasini yashirish va "Less" tugmasini ko'rsatish
  loadMoreButton.style.display = 'none';
  loadLessButton.style.display = 'inline-block';
});

loadLessButton.addEventListener('click', () => {
  // Qo'shimcha bloglarni o'chirish
  const blogCards = blogContainer.querySelectorAll('.blog-card');
  blogCards.forEach((card, index) => {
    if (index >= 3) card.remove();
  });

  // "Less" tugmasini yashirish va "More" tugmasini ko'rsatish
  loadLessButton.style.display = 'none';
  loadMoreButton.style.display = 'inline-block';
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('.plus-icon');

        if (answer.classList.contains('open')) {
            answer.classList.remove('open');
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.classList.add('open');
            icon.style.transform = 'rotate(45deg)';
        }
    });
});

document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Formni qayta yuklamaslik uchun

    const email = document.getElementById('email').value;
    
    // Email manzilini tekshirish
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (emailPattern.test(email)) {
        // Muvaffaqiyatli obuna
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';

        // Emailni (odatda serverga yuborish) saqlash
        console.log("Email subscribed: " + email);
        
        // Inputni tozalash
        document.getElementById('email').value = "";
    } else {
        // Xato email manzili
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('success-message').style.display = 'none';
    }
});

// Bu JavaScript faqat optional, agar siz ijtimoiy tarmoq ikonlarini ko'rsatmoqchi bo'lsangiz, quyidagi kodni ishlatishingiz mumkin
document.addEventListener("DOMContentLoaded", function() {
    const socialLinks = document.querySelectorAll('.footer-social a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transform = 'scale(1.1)';
        });
        link.addEventListener('mouseout', () => {
            link.style.transform = 'scale(1)';
        });
    });
});
