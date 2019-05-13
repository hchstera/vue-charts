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
        hoverbackgroundcolor: {
            default: () => "rgba(75,192,192,0.6)",
        },
        hoverbordercolor: {
            default: () => "rgba(179,181,198,1)",
        }
    },
    data() {
        return {
            type: 'polarArea',
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
        };
    },
}
</script>
