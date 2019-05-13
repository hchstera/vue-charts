export default{
    props: {
        beginzero:{
            type: Boolean,
            default: () => true,
        },
        datalabel: {
            type: String,
            default: () => 'My dataset',
        },
        labels: {
            type: Array,
            default: () => ['first', 'second', 'third', 'fourth'],
        },
        data: {
            type: Array,
            default: () => [40, 60, 45, 70],
        },
        width: {
            type: Number,
            default: () => null,
        },
        height: {
            type: Number,
            default: () => null,
        },
        bordercolor: {
            default: () => "rgba(75,192,192,1)",
        },
        backgroundcolor: {
            default: () => "rgba(75,192,192,0.4)",
        },
        scalesdisplay: {
            type: Boolean,
            default: () => true,
        },
        target: {
            type: String,
            default: () => null,
        },
        datasets:{
            type: Array,
            default: () => null,
        },
        option:{
            type: Object,
            default: () => null,
        },
        bind:{
            type: Boolean,
            default: () =>false,
        }
    },
    data () {
        return {
            isDatasetsOverride : false,
            isOptionOverride : false,
            type : null,
            canvas : null,
            context : null,
            chart: null,
            chart_data : {
                labels: this.labels,
                datasets: this.datasets,
            },
            options :{
                responsive:false,
                maintainAspectRatio:false,
                scales: {
                    yAxes: [{
                        display: this.scalesdisplay,
                        ticks: {
                            beginAtZero:this.beginzero,
                        }
                    }]
                },
            },
        };
    },
    watch:{
        data: {
            handler: function (val, oldVal) {
                if(!this.isDatasetsOverride&&this.bind)
                {
                    this.chart_data.datasets[0].data = this.data;
                    this.renderChart();
                }
            },
            deep: true
        },
        labels: {
            handler: function (val, oldVal) {
                if(this.bind)
                {
                    this.chart_data.labels = val;
                    this.renderChart();
                }
            },
            deep: true
        },
        datasets: {
            handler: function (val, oldVal) {
                if(this.isDatasetsOverride&&this.bind)
                {
                    this.cleanChart();
                    this.sleep(5).then(() => {
                        this.renderChart();
                    })
                }
            },
            deep: true,
        },
    },
    methods:{
        sleep (time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        },
        setDatasets(){
            this.chart_data.datasets = this.datasets;
        },
        setOption(){
            this.options = this.option;
        },
        initTargetCanvas(){
            if(this.target==null){
                this.canvas = this.$refs.canvas;
                this.context = this.$refs.canvas.getContext('2d');
                this.renderChart();
            }
            else {
                this.canvas = document.getElementById(this.target);
                this.context = document.getElementById(this.target).getContext('2d');
                if(typeof datasets == 'undefined')
                    window.datasets = [];
                if(typeof datasets[this.target] == 'undefined')
                    window.datasets[this.target] =[];
                this.appendChart();
            }
        },
        cleanChart(){
            if(this.chart!=null)
                this.chart.destroy();
        },
        checkOverride(){
            if(this.datasets!=null)
            {
                this.setDatasets();
                this.isDatasetsOverride = true;
                // console.log('override the datasets');
            }
            if(this.option!=null)
            {
                this.setOption();
                this.isOptionOverride = true;
                // console.log('override the datasets');
            }
        },
        renderChart() {
            // console.log('renderChart');
            this.cleanChart();
            this.chart = new Chart(this.context, {
                type: this.type,
                data: this.chart_data,
                options: this.options,
            });
        },
        appendChart() {
            // console.log('appendChart');
            window.datasets[this.target].push(this.chart_data.datasets[0]);
            this.chart_data.datasets = window.datasets[this.target];
            if(document.getElementById(this.target).getAttribute("count") == this.chart_data.datasets.length)
            {
                this.renderChart();
            }
        },
        checkSize(){
            if((this.width==null||this.height==null) && !this.isOptionOverride)
            {
                this.options.responsive = true;
                this.options.maintainAspectRatio = true;
            }
        },
    },
    mounted(){
        this.checkOverride();
        this.checkSize();
        this.initTargetCanvas();
    },
    beforeDestroy(){
        this.cleanChart();
        // console.log('Line Chart Before Destroy');
    }
}
