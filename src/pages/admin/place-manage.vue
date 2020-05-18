<template>
  <div class="user-manage-container">
    <div class="header-operator">
      <span>体育馆id查询</span>
      <el-input
        placeholder="请输入>体育馆id"
        v-model="gymId"
        style="width:200px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>

      <span>场地名查询</span>
      <el-input
        placeholder="请输入场地名"
        v-model="typeName"
        style="width:200px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <!-- <el-button size="small" type="success" @click="handleSave" style="margin-left:10px">新增</el-button> -->

    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="标识" align="center"></el-table-column> -->
      <el-table-column prop="gymId" label="gymId" align="center"></el-table-column>
      <el-table-column prop="typeId" label="typeId" align="center"></el-table-column>
      <el-table-column prop="typeName" label="typeName" align="center"></el-table-column>
      <el-table-column prop="price" label="price" align="center"></el-table-column>
      <el-table-column prop="num" label="num" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
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
        <el-form-item label="gymId">
          <el-input v-model="form.gymId"></el-input>
        </el-form-item>
        <el-form-item label="typeId">
          <el-input v-model="form.typeId"></el-input>
        </el-form-item>
        <el-form-item label="typeName">
          <el-input v-model="form.typeName"></el-input>
        </el-form-item>
        <el-form-item label="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="num">
          <el-input v-model="form.num"></el-input>
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
  name: "place-manage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      uid: null,
      nickname: null,
      username: null,
      disabled: null,
      form: {
        id: "",
        gymId: "",
        typeId: "",
        typeName: "",
        price: "",
        num: ""
      },
      dialogVisible: false,
      op: "新增",
      gymId: "",
      typeName: ""
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
        gymId: this.gymId,
        typeName: this.typeName
      };
      Api.placeList(params).then(res => {
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
        id: "",
        gymId: "",
        typeId: "",
        typeName: "",
        price: "",
        num: ""
      };
    },
    handleConfirm() {
       if (this.op == "编辑") {
        Api.updatePlace(this.form).then(r => {
          console.log(r);
          this.page();
        });
      }
      this.form = {};
      this.dialogVisible = false;
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