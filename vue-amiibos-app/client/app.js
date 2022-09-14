const fetchHistoryComponent = {
    template:`  <div>
                    <div v-for="history in fetchHistory">
                        <ul>
                            <li>
                                <a href="#" class="link" @click="fetch(history); searchOrFetch() ">
                                    {{history.name}} | {{history.time}}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>`,
    props:['fetchHistory'],
    methods:{
        fetch(result){
            this.$parent.fetch(result);
        },
        searchOrFetch(){
            this.$parent.searchOrFetch();
        }
    }
}

const amiibos = new Vue({
    el: '#amiibos',

    data: {
        appName: 'Amiibo App',
        userSearch: '',
        searchError: '',
        isSearching: true,
        searchResult: {},
        chosenSearch: {},
        fetchResult: {},
        fetchHistory: [],
    },

    computed:{
        searchCount: function(){
            return this.searchResult.length
        },

    },

    methods: {
        search: async function(){
            const response = await axios.get(`/api/search/${this.userSearch}`)
            this.searchResult = response.data;
            this.searchError = this.userSearch;
        },

        fetch: async function(result){
            const response = await axios.get(`/api/fetch/${result.key}`)
            this.fetchResult = response.data;
            this.chosenSearch = result
        },
        
        searchOrFetch: function(){
            this.isSearching = !this.isSearching;
        },
        
        createHistory: function(){
            const now = new Date().toDateString();
            
            this.fetchHistory.push({
                key: this.chosenSearch.key,
                name: this.chosenSearch.name,
                time: now,
            })
        },

        checkHistory: function(){
            const match = this.fetchHistory.filter(fetch => fetch.key === this.chosenSearch.key);
            
            if(match.length >= 1){
                return;
            }
            else{
                this.createHistory()
            }
        },    
        
        reset: function(){
            this.checkHistory();
    
            this.userSearch = '';
            this.searchError = '';
            this.isSearching = true;
            this.chosenSearch = {};
            this.searchResult = {};
            this.fetchResult = {};
        },

    },
    components: {
        'tracker-component': fetchHistoryComponent,
    }
})