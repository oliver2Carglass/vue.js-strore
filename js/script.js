
// Create a view app
const app = Vue.createApp({
    data() {
        return {
            currentSection: 'book', //section indicator
            HPCollection: [], // data of package.json
            stockData: [], // data of stock.json
            currentBookIndex: 0, // variable of the index of the Harry Potter crrousel
            total: 0, // total price (sum)
            stock: false, //variable of if the current item is in stock
            //form vairables
            email: '', 
            feedback: ''
        };
    },

    mounted() {
        // Fetching json files
        Promise.all([
            fetch('../package.json').then(response => response.json()),
            fetch('../stock.json').then(response => response.json())
        ])
        .then(data => {
            // Stocking data in variables
            this.HPCollection = data[0].harryPotterCollection;
            this.stockData = data[1];

            // Uptdating stock for the first time
            this.updateStock();
        })
        .catch(error => console.error('Erreur de chargement des fichiers JSON:', error));
    },

    //methods
    methods: {
        //method to swip section and updating the stock corresponding to the item
        swipSection(section) {
            this.currentSection = section;
            this.updateStock();
        },

        //carousel previus and next item gestion
        nextBook() {
            if (this.currentBookIndex < this.HPCollection.length - 1) {
                this.currentBookIndex++;
                this.updateStock()
            }
            this.updateStock();
        },
        prevBook() {
            if (this.currentBookIndex > 0) {
                this.currentBookIndex--;
                this.updateStock()
            }
            this.updateStock();
        },

        //addValue is a method that add the current object price to the "total" variable if the stock is available
        addValue() {
            if(this.stock){
            this.total += this.HPCollection[this.currentBookIndex][this.currentSection].price;
            console.log(this.currentSection, this.total);}
        },

        //updtaeStock is a method that look into the json file to check if the sotck is up or not, then apply difrent css classes by using the stock variable
        updateStock() {
            const currentBook = this.HPCollection[this.currentBookIndex];
            
            // Cheking into json
            const stockElement = this.stockData.stock.find(element => element.bookName === currentBook.bookName);
            
            // Updating variable
            this.stock = stockElement ? stockElement[this.currentSection] : false;
    
            if (this.currentSection === 'movie') {
                this.stock = stockElement ? stockElement.movie : false;
            }
        },
        
        submitFeedback() {
            // getting the view form variable and printing it into console
            console.log('E-mail:', this.email);
            console.log('Feedback:', this.feedback);

            // Réinitialise les champs après l'envoi
            this.email = '';
            this.feedback = '';
        }
        
        
    }
});

app.mount('#app');
