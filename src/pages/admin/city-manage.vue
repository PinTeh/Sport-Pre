<template>
  <div class="user-manage-container">
    <el-button size="small" type="success" @click="handleSave" style="margin-left:10px">新增</el-button>

    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="标识" align="center"></el-table-column> -->
      <el-table-column prop="cityname" label="城市名称" align="center"></el-table-column>
      <el-table-column prop="number" label="数量" align="center"></el-table-column>

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
        <el-form-item label="cityname">
          <el-input v-model="form.cityname"></el-input>
        </el-form-item>
        <el-form-item label="number">
          <el-input v-model="form.number"></el-input>
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
  name: "city-manage",
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
      form: {
        id: "",
        cityname: "",
        number: "",
      },
      dialogVisible: false,
      op: "新增"
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
        limit:this.limit
      }
      Api.cityList(params).then(res => {
        let ret = res.data.data;
        this.tableData = ret;
        // this.tableData = ret.records;
        // this.total = ret.total;
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
        id: "",
        cityname: "",
        number: "",
      };
    },
    handleConfirm() {
      if (this.op == "新增") {
        Api.saveCity(this.form).then(r => {
          console.log(r);
          this.page();
        });
      } 
      this.form = {};
      this.dialogVisible = false;
    },
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