<template>
    <div>
        <canvas v-if="!target" ref="canvas" :width="width" :height="height"/>
    </div>
</template>
<script>
export default {
    mixins: [
        VueCharts.core.default,
    ],
    props: {
        backgroundcolor:{
            default: () => [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#00A600"
            ],
        },
        hoverbackgroundcolor: {
            default: () => [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#00A600"
            ],
        },
        bordercolor:{
            default: () => "#fff",
        },
        hoverbordercolor: {
            default: () => "",
        }
    },
    data() {
        return {
            type: 'pie',
            chart_data: {
                labels: this.labels,
                datasets: [{
                    label: this.datalabel,
                    backgroundColor: this.backgroundcolor,
                    borderColor: this.bordercolor,
                    hoverBackgroundColor: this.hoverbackgroundcolor,
                    hoverBorderColor: this.hoverbackgroundcolor,
                    data: this.data
                }],
            },
            options: {
                scale: {
                    reverse: true,
                    ticks: {
                        beginAtZero: this.beginzero
                    }
                }
            },
        };
    },
}
</script>
