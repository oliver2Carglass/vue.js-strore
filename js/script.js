const app = Vue.createApp({
    data() {
        return {
            currentSection: 'book',
            HPCollection: [], // Ajoutez une propriété pour stocker les données du package.json
            stockData: [], // Ajoutez une propriété pour stocker les données du stock.json
            currentBookIndex: 0, // Ajoutez une propriété pour suivre l'index actuel du livre
            total: 0,
            stock: false
        };
    },
    mounted() {
        // Fetch des fichiers JSON en parallèle
        Promise.all([
            fetch('../package.json').then(response => response.json()),
            fetch('../stock.json').then(response => response.json())
        ])
        .then(data => {
            // Stockage des données dans les propriétés correspondantes
            this.HPCollection = data[0].harryPotterCollection;
            this.stockData = data[1];

            // Mise à jour de la variable stock avec la valeur de l'élément actuel de book ou movie
            this.updateStock();
        })
        .catch(error => console.error('Erreur de chargement des fichiers JSON:', error));
    },
    methods: {
        swipSection(section) {
            this.currentSection = section;
            // Mise à jour de la variable stock lorsque la section change
            this.updateStock();
        },
        nextBook() {
            if (this.currentBookIndex < this.HPCollection.length - 1) {
                this.currentBookIndex++;
                this.updateStock()
            }
            // Mise à jour de la variable stock lorsque le livre change
            this.updateStock();
        },
        prevBook() {
            if (this.currentBookIndex > 0) {
                this.currentBookIndex--;
                this.updateStock()
            }
            // Mise à jour de la variable stock lorsque le livre change
            this.updateStock();
        },
        addValue() {
            this.total += this.HPCollection[this.currentBookIndex][this.currentSection].price;
            console.log(this.currentSection, this.total);
        },
        updateStock() {
            const currentBook = this.HPCollection[this.currentBookIndex];
        
            // Vérifie si l'élément actuel existe dans stockData
            const stockElement = this.stockData.stock.find(element => element.bookName === currentBook.bookName);
        
            // Met à jour la variable stock en fonction de la valeur de l'élément dans stockData
            this.stock = stockElement ? stockElement[this.currentSection] : false;
        }
        
    }
});

app.mount('#app');
