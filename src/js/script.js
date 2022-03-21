class Quadro {
    static async fetchData(){
        const response = await (await fetch("https://kenzie-olympics.herokuapp.com/paises")).json();
        return response
    }
    static createHeadTable(array){
        
        
        const table              = document.getElementById("medal--board");
        const thead              = document.createElement("thead");
        table.innerHTML = '';
        thead.classList.add("title--row");
        thead.innerHTML = `
            <th><button id="sort-by-amount-medals">Posição</button></th>
            <th class="country">País</th>
            <th><button id="sort-by-gold">Ouro</button></th>
            <th><button id="sort-by-silver">Prata</button></th>
            <th><button id="sort-by-bronze">Bronze</button></th>
            <th>Total</th>
        `;
        table.appendChild(thead);
        const searchCountry      = document.getElementById("search--button");
        const buttonSortDefault  = document.getElementById("sort-by-amount-medals");
        const buttonSortByGold   = document.getElementById("sort-by-gold");
        const buttonSortBySilver = document.getElementById("sort-by-silver");
        const buttonSortByBronze = document.getElementById("sort-by-bronze");
        searchCountry.addEventListener("click", (e)=>{
            e.preventDefault();
            const inputValue = document.getElementById("country--search").value;
            this.filterBySearch(inputValue,array);
        });
        buttonSortDefault.addEventListener("click", (e)=>{
            this.sortByDefault(array)
        })
        buttonSortByGold.addEventListener("click", (e)=>{
            this.sortByGold(array)
        })
        buttonSortBySilver.addEventListener("click", (e)=>{
            this.sortBySilver(array)
        })
        buttonSortByBronze.addEventListener("click", (e)=>{
            this.sortByBronze(array)
        })
        return table
    }
    static async createTable(){
        const arrayData = await this.fetchData();
        const table = this.createHeadTable(arrayData);
        this.sortByDefault(arrayData)        
        
    }
    static fillInfoCountry(table,pos,flag,name,gold,silver,bronze){
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${pos}°</td>
            <td class="country"><img src=${flag}> ${name}</td>
            <td>${gold}</td>
            <td>${silver}</td>
            <td>${bronze}</td>
            <td>${gold + silver + bronze}</td>
            `;
        table.appendChild(tr);    
    }
    static filterBySearch(country,arr){
        let table = this.createHeadTable(arr);
        arr.filter(value => value.country === country).forEach(({flag_url,country,medal_gold,medal_silver,medal_bronze},index)=> this.fillInfoCountry(table,index+1,flag_url,country,medal_gold,medal_silver,medal_bronze));
    }
    static sortByDefault(arr){
        let table = this.createHeadTable(arr);
        arr.sort((a,b)=>{
            let totalA = a.medal_bronze + a.medal_gold + a.medal_silver;
            let totalB = b.medal_bronze + b.medal_gold + b.medal_silver;
            if(totalA !== totalB) return totalB - totalA
            return b.medal_gold - a.medal_gold
        }).forEach(({flag_url,country,medal_gold,medal_silver,medal_bronze},index)=> this.fillInfoCountry(table,index+1,flag_url,country,medal_gold,medal_silver,medal_bronze));
    }
    static sortByGold(arr){
        let table = this.createHeadTable(arr);
        arr.sort((a,b)=>{
            return b.medal_gold - a.medal_gold
        }).forEach(({flag_url,country,medal_gold,medal_silver,medal_bronze},index)=> this.fillInfoCountry(table,index+1,flag_url,country,medal_gold,medal_silver,medal_bronze));
    }
    static sortBySilver(arr){
        let table = this.createHeadTable(arr);
        arr.sort((a,b)=>{
            return b.medal_silver - a.medal_silver
        }).forEach(({flag_url,country,medal_gold,medal_silver,medal_bronze},index)=> this.fillInfoCountry(table,index+1,flag_url,country,medal_gold,medal_silver,medal_bronze));
    }
    static sortByBronze(arr){
        let table = this.createHeadTable(arr);
        arr.sort((a,b)=>{
            return b.medal_bronze - a.medal_bronze
        }).forEach(({flag_url,country,medal_gold,medal_silver,medal_bronze},index)=> this.fillInfoCountry(table,index+1,flag_url,country,medal_gold,medal_silver,medal_bronze));
    }
}

Quadro.createTable()