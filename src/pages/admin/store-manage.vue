<template>
  <div class="user-manage-container">
    <div class="header-operator">
      <span>type查询</span>
      <el-input
        placeholder="请输入type"
        v-model="type"
        style="width:200px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>
       <span>用户id查询</span>
      <el-input
        placeholder="请输入userId"
        v-model="userId"
        style="width:200px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>

            <span>体育馆名查询</span>
      <el-input
        placeholder="请输入体育馆名"
        v-model="gymName"
        style="width:200px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="标识" align="center"></el-table-column> -->
      <el-table-column prop="userId" label="userId" align="center"></el-table-column>
      <el-table-column prop="gymName" label="gymName" align="center"></el-table-column>
      <el-table-column prop="gymId" label="gymId" align="center"></el-table-column>
      <el-table-column prop="type" label="type" align="center"></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="prev, pager, next, jumper"
      :total="total"
      style="margin-top:10px;"
    ></el-pagination>

  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "store-manage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      uid: null,
      nickname:null,
      username:null,
      disabled: null,
     type:'',
     userId:'',
     gymName:''
    };
  },
  mounted() {
    this.page();
  },
  methods: {
    handleInputClear() {
      this.page();
    },
    handleSearchButton() {
      this.page();
    },
    handleSelectChange() {
      this.page();
    },
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page();
    },
    page() {
        let params = {
        page:this.currentPage,
        limit:this.limit,
        gymName:this.gymName,
        userId:this.userId,
        type:this.type
      }
      Api.storeList(params).then(res => {
        let ret = res.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
    },
  

    handleDelete(v) {
      Api.deleteStore(v.id).then(r => {
        console.log(r);
        this.page();
      });
    }
  }
};
</script>

<style lang="less">
.user-manage-container {
  background: #fff;
  padding: 20px;
  text-align: left;
  .header-operator {
    padding: 10px 0px 5px 0px;
    height: 40px;
    background: rgba(255, 255, 255, 0.315);
    display: inline-block;
    span {
      font-size: 13px;
      color: rgb(100, 100, 100);
      margin: 0px 5px 0px 20px;
    }
  }
}
</style>