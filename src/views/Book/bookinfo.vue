<template>
<div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchWhere"
      class="demo-form-inline"
      style="margin-top:20px"
    >
      <el-form-item label="书名" size="mini" prop="bookName">
        <el-input v-model="searchWhere.bookName" placeholder="书名" style="width:150px"></el-input>
      </el-form-item>
      <el-form-item label="出版社" size="mini" prop="press" @click.right.prevent.native="dialogPressVisible=true">
        <el-input v-model="searchWhere.press" placeholder="出版社" style="width:120px"></el-input>
      </el-form-item>
      <el-form-item label="图书类型" size="mini" prop="bookType">
        <el-select v-model="searchWhere.bookType" placeholder="图书类型" style="width:120px">
          <el-option
            v-for="option in bookTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出版日期" size="mini" prop="publicationdate">
        <el-date-picker
          v-model="searchWhere.publicationdate"
          style="width:250px"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
        <el-button type="primary" @click="addHandle">新增</el-button>
      </el-form-item>
    </el-form>



  <el-table :data="bookinfolist" style="width: 100%;margin-top:20px" max-height="620px" >
    <el-table-column fixed type="index" label="序号" width="60">
    </el-table-column>
    <el-table-column prop="bookISBN" label="书号" width="150">
    </el-table-column>
    <el-table-column prop="bookName" label="书名" width="200">
    </el-table-column>
    <el-table-column prop="author" label="作者" width="100"> </el-table-column>
    <el-table-column prop="press" label="出版社" width="150"> </el-table-column>
    <el-table-column prop="publicationdate" label="出版日期" width="150">
    </el-table-column>
    <el-table-column prop="price" label="价格" width="100"> </el-table-column>
    <el-table-column prop="quantity" label="数量 " width="100">
    </el-table-column>
    <el-table-column prop="bookType" label="图书类型" width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.bookType | bookTypeFilter }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="150" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row.id)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

     <!-- 新增对话框 -->
    <el-dialog title="编辑图书信息" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form" label-width="100px" label-position="right" ref="addForm" style="width:400px;margin-top:-20px; " :rules="rules">
        <el-form-item label="书号" prop="bookISBN">
          <el-input v-model="form.bookISBN" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="书名" prop="bookName">
          <el-input v-model="form.bookName" size="mini" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="press">
          <el-input v-model="form.press" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" prop="publicationdate" >
          <el-date-picker
            size="mini"
            v-model="form.publicationdate"
            align="right"
            type="date"
            placeholder="选择日期"
           
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model.number="form.quantity" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="图书类型" prop="bookType">
          <el-select v-model="form.bookType" placeholder="请选择图书类型" size="mini">
            <el-option
              v-for="option in bookTypeOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="form.id===null?addData('addForm'):updateData('addForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择出版社对话框 -->
     <el-dialog title="选择出版社" :visible.sync="dialogPressVisible" width="800px">
       <Press @sendData="getData"></Press>
     </el-dialog>
  </div>
</template>
<script>
import bookinfoApi from "@/api/bookinfo.js";
const bookTypeOptions = [
  { type: "1", name: "编程类" },
  { type: "2", name: "前端类" },
  { type: "3", name: "后端类" },
  { type: "4", name: "移动类" }
];
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogPressVisible:false,
      form: {
        id:null,
        bookISBN:'',
        bookName:'',
        author:'',
        press:'',
        publicationdate:'',
        quantity:'',
        price:'',
        bookType:''
      },
      bookinfolist: [],
      total:0,
      currentPage:1,
      pageSize:10,
      bookTypeOptions,
         rules:{
        bookISBN:[
          {required:true,message:'请输入书号',trigger:'blur'}
        ],
        bookName:[
          {required:true,message:'请输入书名',trigger:'blur'}
        ],
        publicationdate:[
          {required:true,message:'请选择日期',trigger:['blur','change']}
        ],
        quantity:[
           {required:true,message:'数量不能为空',trigger:'blur'},
           {type:'number',message:'数量必须为数字',trigger:'blur'}
        ]
      },
      searchWhere:{
        id:null,
        bookName: "",
        press: "",
        bookType: "",
        publicationdate: ""
      }
    };
  },
  created() {
    this.fetchData();
  },
  filters: {
    bookTypeFilter(type) {
      const booktypeobk = bookTypeOptions.find(obj => obj.type == type);
      return booktypeobk ? booktypeobk.name : null;
    }
  },
  methods: {
    fetchData() {
    bookinfoApi
    //   .getBookInfoList()
    .search(this.currentPage,this.pageSize,this.searchWhere)
      .then(res => {
        const resp = res.data;
        console.log(resp);
        this.bookinfolist = resp.data.rows;
        this.total=resp.data.total;
      });
    },
      addHandle(){
      this.dialogFormVisible=true
      this.$nextTick(()=>{
          this.$refs['addForm'].resetFields();
      })
    },
      addData(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            // 
            console.log('add')
            bookinfoApi.add(this.form).then(response=>{
              const resp=response.data
              if(resp.flag)
              {
                this.fetchData()
                this.dialogFormVisible=false
              }
              else{
                this.$message({
                  message:resp.message,
                  type:'warning'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
     handleDelete(id) {
      this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           console.log('delete');
           bookinfoApi.deleteBookById(id).then(response=>{
             const resp=response.data
              this.$message({
                type: resp.flag?'success':'error',
                message: resp.message              
          });
           if(resp.flag)
           {
             this.fetchData()
           }
           })          
        }).catch(() => {
            console.log('cancel');
        });
  
    },
     resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEdit(id) {
    this.addHandle();
      bookinfoApi.getBookById(id).then(response=>{
        const resp=response.data
        if(resp.flag)
        {
          this.form=resp.data
        }
        else{
          this.$message({
            message:resp.message,
            type:'warning'
          })
        }
      })
    },
    handleSizeChange(size){
        this.pageSize=size;
        this.fetchData();
    },
    handleCurrentChange(currentPage){
        this.currentPage=currentPage;
         this.fetchData();
    },
    updateData(formName){
      console.log('update')
       console.log(this.form.id)
       this.$refs[formName].validate((valid) => {
          if (valid) {
            bookinfoApi.updateBook(this.form).then(response=>{
              const resp=response.data
              if(resp.flag)
              {
                 console.log('123213')
                this.fetchData();
                this.form.id=null
                this.dialogFormVisible=false
              }
              else{
                this.$message({
                  message:resp.message,
                  type:'warning'
                })
              }
            })
          }
          else
          {
            return false
          }
       })
    },
  }
};
</script>
<style scoped>
.el-pagination{
  margin-top: 40px;
}
</style>>
