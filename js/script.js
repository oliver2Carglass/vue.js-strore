const app = Vue.createApp({
    data() {
        return {
            currentSection: 'book',
            HPCollection: [], // Ajoutez une propriété pour stocker les données du JSON
            currentBookIndex: 0, // Ajoutez une propriété pour suivre l'index actuel du livre
            total: 0,
            stock: true
        };
    },
    mounted() {
        // Fetch du fichier JSON
        fetch('../package.json')
            .then(response => response.json())
            .then(data => {
                // Stockage des données dans la propriété HPCollection
                this.HPCollection = data.harryPotterCollection;
            })
            .catch(error => console.error('Erreur de chargement du fichier JSON:', error));
    },
    methods: {
        swipSection(section) {
            this.currentSection = section;
        },
        nextBook() {
            if (this.currentBookIndex < this.HPCollection.length - 1) {
                this.currentBookIndex++;
            }
        },
        prevBook() {
            if (this.currentBookIndex > 0) {
                this.currentBookIndex--;
            }
        },
        addValue() {
            this.total += this.HPCollection[this.currentBookIndex][this.currentSection].price;
            console.log( this.currentSection, this.total )
        }
        
    }
});

app.mount('#app');
