new Vue({
    el: '#vue',
    data: {
        currentQuote: '',
        ongoingQuote: '',

        cv: null
    },
    methods: {
        quoteTick: function() {
            if (this.ongoingQuote === this.currentQuote) {
                this.currentQuote = window.quotes[Math.floor(Math.random() * window.quotes.length)];
                this.ongoingQuote = '';
            } else {
                this.ongoingQuote += this.currentQuote[this.ongoingQuote.length];
            }

            setTimeout(this.quoteTick.bind(this), (Math.random() * 400) + 100);
        }
    },
    init: function() {
        this.cv = window.cv;
    },
    created: function() {
        this.quoteTick();
    }
});
