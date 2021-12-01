<template>
  <Form :model="formItem" :label-width="80">

    <FormItem label="课程名称">
      <Input v-model="formItem.input" placeholder="点击输入...."></Input>
    </FormItem>
    <FormItem label="课程类型">
      <Select v-model="formItem.select">
        <Option value="beijing">主修</Option>
        <Option value="shanghai">选修</Option>
        <Option value="shenzhen">辅修</Option>
      </Select>
    </FormItem>
    <FormItem label="上课地点">
      <Select v-model="formItem.select">
        <Option value="beijing">博学楼</Option>
        <Option value="shanghai">厚德楼</Option>
        <Option value="shenzhen">唯物楼</Option>
      </Select>
    </FormItem>
    <FormItem label="开课日期">
        <Col span="11">
          <DatePicker type="date" placeholder="选择日期" v-model="formItem.date"></DatePicker>
        </Col>
        <Col span="2" style="text-align: center">-</Col>
    </FormItem>


    <FormItem label="课程简介">
      <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="点击输入...."></Input>
    </FormItem>
    <FormItem label="人数限制">
      <InputNumber :max="10" :min="1" v-model="value1"></InputNumber>
    </FormItem>


    <FormItem>
      <Button type="primary">点击添加</Button>
      <Button style="margin-left: 8px">取消</Button>
    </FormItem>
  </Form>
</template>
<script>
    export default {
        name: 'AddClass',
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                    checkbox: [],
                    date: '',
                    textarea: ''
                }
            }
        }
    }
</script>
