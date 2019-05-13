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
        pointbordercolor: {
            default: () => "#fff",
        },
        pointbackgroundcolor: {
            default: () => "rgba(179,181,198,1)",
        }
    },
    data() {
        return {
            type: 'radar',
            chart_data: {
                labels: this.labels,
                datasets: [{
                    label: this.datalabel,
                    backgroundColor: this.backgroundcolor,
                    borderColor: this.bordercolor,
                    pointBackgroundColor: this.pointbackgroundcolor,
                    pointBorderColor: this.pointbordercolor,
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(179,181,198,1)",
                    data: this.data
                }],
            },
            options: {
                scale: {
                    reverse: false,
                    ticks: {
                        beginAtZero: this.beginzero
                    }
                }
            },
        };
    },
}
</script>
