<template>
  <div class="user-manage-container">
    <div class="header-operator">
      <span>用户名查询</span>
      <el-input
        placeholder="请输入用户名"
        v-model="username"
        style="width:200px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleUsernameSearchButton" icon="el-icon-search"></el-button>
      </el-input>

      <span>昵称查询</span>
      <el-input
        placeholder="请输入昵称"
        v-model="nickname"
        style="width:200px"
        size="small"
        :clearable="true"
        @clear="handleInputClear"
      >
        <el-button slot="append" @click="handleNicknameSearchButton" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-button size="small" type="success" @click="handleSave" style="margin-left:10px">新增</el-button>

    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="标识" align="center"></el-table-column> -->
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="password" label="密码" align="center"></el-table-column>
      <el-table-column prop="nickname" label="别称" align="center"></el-table-column>
      <el-table-column prop="phonenum" label="手机" align="center"></el-table-column>
      <el-table-column prop="avatar" label="头像" width="180" align="center">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatar"></el-avatar>
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
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.phonenum"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.avatar"></el-input>
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
  name: "user-manage",
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
        username: "",
        password: "",
        nickname: "",
        phonenum: "",
        avatar: ""
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
    handleUsernameSearchButton() {
      let params = {
        page: this.currentPage,
        limit: this.limit,
        username:this.username
      };
      Api.userList(params).then(res => {
        let ret = res.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
    },
    handleNicknameSearchButton() {
      let params = {
        page: this.currentPage,
        limit: this.limit,
        nickname:this.nickname
      };
      Api.userList(params).then(res => {
        let ret = res.data.data;
        this.tableData = ret.records;
        this.total = ret.total;
      });
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
        limit: this.limit
      };
      Api.userList(params).then(res => {
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
        username: "",
        password: "",
        nickname: "",
        phonenum: "",
        avatar: ""
      };
    },
    handleConfirm() {
      if (this.op == "新增") {
        Api.saveUser(this.form).then(r => {
          console.log(r);
          this.page();
        });
      } else if (this.op == "编辑") {
        Api.updateUser(this.form).then(r => {
          console.log(r);
          this.page();
        });
      }
      this.form = {};
      this.dialogVisible = false;
    },
    handleDelete(v) {
      Api.deleteUser(v.id).then(r => {
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