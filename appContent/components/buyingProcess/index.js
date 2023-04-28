const comp = {

    data() {
        return {
            totall: 0,
            price: null,
            quantity: 0
        }
    },
    methods: {
        clearInput: (e) => {
            e.value = null
        }
    },
    watch: {
        totall: function(nt, ot) {

            if (this.quantity !== 0) {
                this.price = nt / this.quantity
            } else {
                this.price = 0
            }
        },
        quantity: function(nt, ot) {
            if (nt !== 0) {
                this.price = this.totall / nt
            } else {
                this.price = 0
            }
        }
    }


}

export default () => {
    return fetch('./appContent/components/buyingProcess/index.html')
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            return {
                template: html,
                ...comp

            }
        });
};