<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="Query.empname" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="Query.deptname" placeholder="部门" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in depetList" :key="item.key" :label="item.dept_name" :value="item.dept_name" />
      </el-select>
      <el-select v-model="Query.degreename" placeholder="学历" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in degreeList" :key="item.key" :label="item.degree_name" :value="item.degree_name" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>
    <div>
      <el-table
        id="table"
        ref="exportTable"
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        border
      >
        <el-table-column
          prop="id"
          label="序号"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="emp_name"
          label="职工姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="性别"
          width="100"
          prop="sex"
        >
        </el-table-column>
        <el-table-column
          label="年龄"
          width="100"
          prop="age"
        >
        </el-table-column>
        <el-table-column
          label="部门名称"
          width="100"
          prop="dept_name"
        >
        </el-table-column>
        <el-table-column
          label="学历"
          width="100"
          prop="emp_degree_name"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              修改
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      <el-dialog :title="dialogstaus" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="职工姓名" :label-width="formLabelWidth">
            <el-input v-model="form.emp_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-input v-model="form.sex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" :label-width="formLabelWidth">
            <el-select v-model="form.dept_name" placeholder="请选择部门">
              <el-option v-for="item in depetList" :key="item.key" :label="item.dept_name" :value="item.dept_name" />
            </el-select>
          </el-form-item>
          <el-form-item label="学历" :label-width="formLabelWidth">
            <el-select v-model="form.degree_name" placeholder="请选择学位">
              <el-option v-for="item in degreeList" :key="item.key" :label="item.degree_name" :value="item.degree_name" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="back">取 消</el-button>
          <el-button type="primary" @click="toaddandupdaye">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getEmpList, QueryEmp, getDeptDegrees, addEmp, updateEmp, deleteEmp } from '@/api/emp'
import Pagination from '@/components/Pagination'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
   export default {
    components: { Pagination },
    data() {
      return {
        tableData: [],
        listQuery: {
        page: 1,
        limit: 10
      },
        Query: {
        empname: '',
        deptname: '',
        degreename: ''
        },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      total: 0,
      depetList: [],
      degreeList: [],
      dialogstaus: '',
      dialogFormVisible: false,
      form: {
        id: '',
        emp_name: '',
        sex: '',
        age: '',
        dept_name: '',
        degree_name: ''
      },
      formLabelWidth: '120px'
      }
    },
    created() {
    this.getList()
    this.getDeptDegreeList()
    },
    methods: {
        getList() {
          getEmpList(this.listQuery).then(response => {
        this.tableData = response.data.list
        this.total = response.data.total
      })
    },
    handleFilter() {
      // console.log('查询')
      // console.log(this.Query)
      QueryEmp(this.Query).then(res => {
        this.tableData = res.data
        this.total = res.data.length
      //   console.log()
      // console.log(res)
    })
    },
    getDeptDegreeList() {
     getDeptDegrees().then(res => {
       this.depetList = res.data.depts
       this.degreeList = res.data.degrees
        // console.log(res.data.depts)
        // console.log(res.data.degrees)
     })
    },
    handleCreate() {
      // this.form = ''
      this.dialogstaus = '添加'
      this.dialogFormVisible = true
    },
    toaddandupdaye() {
      console.log(this.form)
      var emp = this.form
      console.log(emp)
      if (this.dialogstaus === '添加') {
        addEmp(emp).then(res => {
            console.log(res)
        })
      } else if (this.dialogstaus === '修改') {
        updateEmp(emp).then(res => {
            console.log(res)
        })
      }
      this.dialogFormVisible = false
      this.form = []
      this.$router.go(0)
    },
    back() {
      this.dialogFormVisible = false
      this.form = []
    },
    handleUpdate(row) {
      this.dialogstaus = '修改'
      this.dialogFormVisible = true
      this.form.emp_name = row.emp_name
      this.form.dept_name = row.dept_name
      this.form.degree_name = row.emp_degree_name
      this.form.sex = row.sex
      this.form.age = row.age
      this.form.id = row.id
      // console.log('row', row)
    },
    handleDelete(row) {
      this.form.id = row.id
       console.log(this.form)
       deleteEmp(this.form).then(res => {
        console.log(res)
       })
       this.$router.go(0)
    },
    handleDownload() {
      const tableRef = this.$refs.exportTable.$el
      const wb = XLSX.utils.table_to_book(tableRef)
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const file = new Blob([wbout], { type: 'application/octet-stream' })
      saveAs(file, 'emptable.xlsx')
    }
    }
  }
</script>
<style  scoped>
.filter-container {
  padding-bottom: 20px;
}
</style>