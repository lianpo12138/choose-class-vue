<template>
  <div>
    <div class="query-c">
      {{ nowDate }}
    </div>
    <br>
    <Table border stripe :columns="columns1" :data="data1"></Table>
    <br>

  </div>
</template>

<script>
    export default {
        name: 'T1',
        data() {
            return {
                columns1: [
                    {
                        title: '时间',
                        key: 'time'
                    },{
                        title: '周日',
                        key: 'sunday'
                    },
                    {
                        title: '周一',
                        key: 'monday'
                    },
                    {
                        title: '周二',
                        key: 'tuesday'
                    },
                    {
                        title: '周三',
                        key: 'wednesday'
                    }, {
                        title: '周四',
                        key: 'thursday'
                    },
                    {
                        title: '周五',
                        key: 'friday'
                    },
                    {
                        title: '周六',
                        key: 'saturday'
                    }
                ],
                data1: [
                    {
                        time:'第一节（8:00-8:40）'
                    },{
                        time:'第二节（8:50-9:30）'
                    },{
                        time:'第三节（10:00-10:40）'
                    },{
                        time:'第四节（11:00-11:40）'
                    },{
                        time:'第五节（8:00-9:40）'
                    },{
                        time:'第六节（8:00-9:40）'
                    },{
                        time:'第七节（8:00-9:40）'
                    },{
                        time:'第八节（8:00-9:40）'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
