<template>
    <div>
        <div class="query-c">
            查询：
            <Input search placeholder="请输入查询内容" style="width: auto"  />
        </div>
        <br>
        <Table border stripe :columns="columns1" :data="data1"></Table>
        <br>
        <Page :total="100" show-sizer show-elevator/>
    </div>
</template>

<script>
export default {
    name: 'T1',
    data() {
        return {
            columns1: [
                {
                    title: '课程编号',
                    key: 'id'
                },{
                    title: '课程名称',
                    key: 'name'
                },
                {
                    title: '教师名称',
                    key: 'teacher'
                },
                {
                    title: '地点',
                    key: 'position'
                },
                {
                    title: '上课时间',
                    key: 'time'
                }, {
                    title: '人数限制',
                    key: 'maxnum'
                },
                {
                    title: '已选人数',
                    key: 'nownum'
                }
            ],
            data1: [
                {
                    id : 1,
                    name: '英语短剧',
                    teacher: '黄庆芳',
                    position: '英语智慧教室（融创楼三楼）',
                    maxnum: 20,
                    nownum: 5,
                    time: '周三12节'
                },{
                    id : 2,
                    name: '英语趣配音',
                    teacher: '张文珍',
                    position: '初一（1）班教室（融知楼一楼）',
                    maxnum: 20,
                    nownum: 6,
                    time: '周四34节'
                },{
                    id : 3,
                    name: '主持人',
                    teacher: '吴利萍',
                    position: '初一（2）班教室（融知楼一楼）',
                    maxnum: 20,
                    nownum: 1,
                    time: '周四34节'
                },{
                    id : 4,
                    name: '经典诵读',
                    teacher: '吴俊达',
                    position: '初一（3）班教室（融知楼一楼）',
                    maxnum: 20,
                    nownum: 0,
                    time: '周四34节'
                },{
                    id : 5,
                    name: '释放压力走进心灵',
                    teacher: '汪艳',
                    position: '团体辅导室（融创楼六楼）',
                    maxnum: 20,
                    nownum: 14,
                    time: '周四34节'
                },{
                    id : 6,
                    name: '趣味物理小实验',
                    teacher: '万中伟',
                    position: '物理实验室2（融创楼二楼',
                    maxnum: 20,
                    nownum: 20,
                    time: '周四34节'
                }

            ]
        }
    }
}
</script>

<style scoped>

</style>
