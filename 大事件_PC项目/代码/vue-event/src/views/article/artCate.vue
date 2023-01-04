<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateBtnFn">添加分类</el-button>
      </div>
      <!-- 表格区域 -->
      <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column
          label="序号"
          type="index"
          width="100"
        ></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
            <template v-slot="scope">
                <el-button type="primary" size="mini" @click="updateFn(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="removeFn(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog :title="isEdit ? '编辑文章分类' : '添加文章分类'" :visible.sync="addVisible" width="35%" @closed="onAddClosedFn">
      <!-- 添加的表单 -->
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="addForm.cate_name"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="addForm.cate_alias"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelFn">取 消</el-button>
        <el-button size="mini" type="primary" @click="addFn">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArtCateListAPI, addArtCateAPI, updateArtCateAPI, delArtCateAPI } from '@/api'
export default {
  name: 'ArtCate',
  data () {
    return {
      cateList: [], // 文章的分类列表
      addVisible: false, // 添加分类-对话框是否显示
      addForm: { // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      },
      editId: '', // 要修改的文章id
      isEdit: false // 保存编辑状态(false新增, true编辑)
    }
  },
  created () {
    // 获取文章分类
    this.initCateListFn()
  },
  methods: {
    // 添加分类->点击出对话框
    addCateBtnFn () {
      this.addVisible = true // 让对话框出现
      this.editId = '' // 编辑的文章分类id设置无
      this.isEdit = false // 编辑的状态关闭
    },
    // 获取文章分类
    async initCateListFn () {
      const res = await getArtCateListAPI()
      this.cateList = res.data.data
    },
    // 对话框内-添加按钮-点击事件
    async addFn () {
      // 表单预校验
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          // 判断当前是新增还是编辑
          if (this.isEdit) {
            // 编辑状态
            // 调用接口传递数据给后台
            const { data: res } = await updateArtCateAPI({ id: this.editId, ...this.addForm })
            if (res.code !== 0) return this.$message.error('更新分类失败！')
            this.$message.success('更新分类成功！')
          } else {
            // 新增
            // 调用接口传递数据给后台
            const { data: res } = await addArtCateAPI(this.addForm)
            if (res.code !== 0) return this.$message.error('添加分类失败！')
            this.$message.success('添加分类成功！')
          }

          // 重新请求列表数据
          this.initCateListFn()
          // 关闭对话框
          this.addVisible = false
        } else {
          return false
        }
      })
    },
    // 对话框内-取消按钮-点击事件
    cancelFn () {
      this.addVisible = false
    },
    // 对话框-关闭事件
    onAddClosedFn () {
      this.$refs.addRef.resetFields()
    },
    // 更新-按钮点击事件
    updateFn (obj) {
      this.editId = obj.id // 保存要编辑的文章分类ID
      this.isEdit = true // 设置编辑状态
      this.addVisible = true // 让对话框显示
      // 设置数据回显
      this.$nextTick(() => {
        // 先让对话框出现, 它绑定空值的对象, 才能resetFields清空用初始空值
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    // 删除-文章分类
    async removeFn (id) {
      const { data: res } = await delArtCateAPI(id)
      if (res.code !== 0) return this.$message.error('删除分类失败！')
      this.$message.success('删除分类成功！')
      // 重新请求列表数据
      this.initCateListFn()
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
