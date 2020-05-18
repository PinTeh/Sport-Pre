<template>
  <div class="order-manage-container">
    <div class="header-operator">
      <span>订单号查询</span>
      <el-input
        placeholder="请输入订单号"
        v-model="orderNum"
        style="width:300px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>
      <span>用户id查询</span>
      <el-input
        placeholder="请输入用户id"
        v-model="userId"
        style="width:300px"
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
        style="width:300px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleSearchButton" icon="el-icon-search"></el-button>
      </el-input>
      <br>
      <div style="height:5px"></div>
      <span>场地名查询</span>
      <el-input
        placeholder="请输入场地名"
        v-model="typeName"
        style="width:300px"
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
      <el-table-column prop="orderNum" label="订单号" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户id" align="center"></el-table-column>
      <el-table-column prop="gymName" label="gymName" align="center"></el-table-column>
      <el-table-column prop="typeName" label="typeName" align="center"></el-table-column>
      <el-table-column prop="price" label="price" align="center"></el-table-column>
      <el-table-column prop="ordertime" label="ordertime" align="center"></el-table-column>
      <el-table-column prop="time" label="time" align="center"></el-table-column>
      <el-table-column prop="date" label="date" align="center">
        <template slot-scope="scope">
          <span>{{(scope.row.date).substring(0,10)}}</span>
        </template>
      </el-table-column>
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

    <el-dialog :title="op" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="orderNum">
          <el-input v-model="form.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="userId">
          <el-input v-model="form.userId"></el-input>
        </el-form-item>
        <el-form-item label="gymName">
          <el-input v-model="form.gymName"></el-input>
        </el-form-item>
        <el-form-item label="typeName">
          <el-input v-model="form.typeName"></el-input>
        </el-form-item>
        <el-form-item label="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="ordertime">
          <el-input v-model="form.ordertime"></el-input>
        </el-form-item>
        <el-form-item label="time">
          <el-input v-model="form.time"></el-input>
        </el-form-item>
        <el-form-item label="date">
          <el-input v-model="form.date"></el-input>
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
  name: "order-manage",
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
        id: "",
        orderNum: "",
        userId: "",
        gymName: "",
        typeName: "",
        price: "",
        ordertime: "",
        time: "",
        date: ""
      },
      dialogVisible: false,
      op: "新增",
      orderNum: "",
      typeName: "",
      gymName: "",
      userId: ""
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
        orderNum: this.orderNum,
        typeName: this.typeName,
        gymName: this.gymName,
        userId: this.userId
      };
      Api.orderList(params).then(res => {
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
        orderNum: "",
        userId: "",
        gymName: "",
        typeName: "",
        price: "",
        ordertime: "",
        time: "",
        date: ""
      };
    },
    handleConfirm() {
      if (this.op == "编辑") {
        Api.updateOrder(this.form).then(r => {
          console.log(r);
          this.page();
        });
      }
      this.form = {};
      this.dialogVisible = false;
    },
    handleDelete(v) {
      Api.deleteOrder(v.id).then(r => {
        console.log(r);
        this.page();
      });
    }
  }
};
</script>

<style lang="less">
.order-manage-container {
  background: #fff;
  padding: 20px;
  text-align: left;
  .header-operator {
    padding: 10px 0px 5px 0px;
    height: auto;
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