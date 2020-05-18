<template>
  <div class="user-manage-container">
    <div class="header-operator">
      <span>体育馆名查询</span>
      <el-input
        placeholder="请输入体育馆名"
        v-model="gymName"
        style="width:300px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>
      <span>城市名查询</span>
      <el-input
        placeholder="请输入城市名"
        v-model="cityname"
        style="width:300px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-button size="small" type="success" @click="handleSave" style="margin-left:10px">新增</el-button>

    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="标识" align="center"></el-table-column> -->
      <el-table-column prop="gymName" label="名称" align="center"></el-table-column>
      <el-table-column prop="cityname" label="城市名称" align="center"></el-table-column>
      <el-table-column prop="gymAddress" label="地址" align="center"></el-table-column>
      <el-table-column prop="gymPhone" label="预约电话" align="center"></el-table-column>
      <el-table-column prop="opentime" label="开启时间" align="center"></el-table-column>
      <el-table-column prop="closetime" label="结束时间" align="center"></el-table-column>
      <el-table-column prop="imageUrl" label="图像" width="180" align="center">
        <template slot-scope="scope">
           <el-image
          style="width: 100px; height: 50px"
          :src="scope.row.imageUrl"
          fit="contain"></el-image>
            </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
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

    <el-dialog :title="op" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.gymName"></el-input>
        </el-form-item>
        <el-form-item label="城市名称">
          <el-input v-model="form.cityname"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.gymAddress"></el-input>
        </el-form-item>
        <el-form-item label="场馆电话">
          <el-input v-model="form.gymPhone"></el-input>
        </el-form-item>
        <el-form-item label="开启时间">
          <el-input v-model="form.opentime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="form.closetime"></el-input>
        </el-form-item>
        <el-form-item label="图像">
          <el-input v-model="form.imageUrl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "../../api";
export default {
  name: "gym-manage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      uid: null,
      key: null,
      disabled: null,
      form: {
        id: null,
        gymName: "",
        cityname: "",
        gymAddress: "",
        gymPhone: "",
        opentime: "",
        closetime: "",
        imageUrl: ""
      },
      dialogVisible: false,
      op: "新增",
      gymName:'',
      cityname:''
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
        page: this.currentPage,
        limit: this.limit,
        gname:this.gymName,
        cityname:this.cityname
      };
      Api.gymList(params).then(res => {
        let ret = res.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
    },
    handleEdit(v) {
      this.form = v;
      (this.op = "编辑"), (this.dialogVisible = true);
    },
    handleSave() {
      this.dialogVisible = true;
      this.op = "新增";
      this.form = {
        id: null,
        gymName: "",
        cityname: "",
        gymAddress: "",
        gymPhone: "",
        opentime: "",
        closetime: "",
        imageUrl: ""
      };
    },
    handleConfirm() {
      if (this.op == "新增") {
        Api.saveGym(this.form).then(r => {
          console.log(r);
          this.page();
        });
      } else if (this.op == "编辑") {
        Api.updateGym(this.form).then(r => {
          console.log(r);
          this.page();
        });
      }
      this.form = {};
      this.dialogVisible = false;
    },
    handleDelete(v) {
      Api.deleteGym(v.id).then(r => {
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