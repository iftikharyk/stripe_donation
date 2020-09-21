const { default: Stripe } = require("stripe");
const stripe = Stripe(process.env.PUBLIC_KEY);
const elements = stripe.elements();

var style = {
    base: {
        color: '#fff'
    }
};

const card = elements.create('card', { style });
card.mount('#card-element');

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

const stripeTokenHandler = token => {
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);

    form.appendChild(hiddenInput);

    form.submit();
};

form.addEventListener('submit', e => {
    e.preventDefault();


    stripe.createToken(card).then(res => {
        if (res.error) {
            errorEl.textContent = res.error.message;
        } else {
            stripeTokenHandler(res.token);
        }
    });
});