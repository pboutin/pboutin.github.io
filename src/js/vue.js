new Vue({
    el: '#vue',
    data: {
        quotes: window.quotes,
        quotesRemaining: [],
        currentQuote: '',
        ongoingQuote: '',

        cv: window.cv
    },
    methods: {
        quoteTick: function() {
            var delay = (Math.random() * 100) + 75;

            if (this.quotesRemaining.length === 0) {
                this._resetQuotes();
            }

            if (this.ongoingQuote === this.currentQuote) {
                this.currentQuote = this.quotesRemaining.pop();
                this.ongoingQuote = '';
            } else {
                this.ongoingQuote += this.currentQuote[this.ongoingQuote.length];

                if (this.ongoingQuote === this.currentQuote) {
                    delay = 1000;
                }
            }
            setTimeout(this.quoteTick.bind(this), delay);
        },
        _resetQuotes: function() {
            this.quotesRemaining = this.quotes.slice();
            var count = this.quotesRemaining.length;

            while (count > 0) {
                var index = Math.floor(Math.random() * count--);

                var tmp = this.quotesRemaining[count];
                this.quotesRemaining[count] = this.quotesRemaining[index];
                this.quotesRemaining[index] = tmp;
            }
        }
    },
    created: function() {
        this.quoteTick();
    }
});
