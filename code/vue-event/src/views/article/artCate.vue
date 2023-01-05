<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCatrShowDialogFn"
          >添加分类</el-button
        >
      </div>
      <!-- 分类数据的表格 -->
      <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column
          type="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
        <el-button type="primary" size="mini" @click="updateCateBtnFn(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="removeFn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加文章分类的对话框 -->
    <el-dialog
      :title="isEdit ? '编辑文章分类' : '添加文章分类'"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogColoseFn"
    >
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
        <el-button @click="cancleFn">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
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
      // 文章的分类列表
      cateList: [],
      dialogVisible: false,
      addForm: {
        // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      editId: '', // 要修改的文章id
      isEdit: false, // 保存编辑状态(false新增, true编辑)
      addRules: {
        // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '分类名必须是1-10位的非空字符',
            trigger: 'blur'
          }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是1-15位的字母数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    // 获取文章分类
    this.initCateListFn()
  },
  methods: {
    // 获取文章分类
    async initCateListFn () {
      const res = await getArtCateListAPI()
      console.log(res)
      this.cateList = res.data.data
    },
    // 添加分类按钮点击事件---为了让对话框出现
    addCatrShowDialogFn () {
      this.isEdit = false
      this.editId = ''
      this.dialogVisible = true
    },
    // 对话框确定按钮的点击事件 --让对话框消失，调用保存文章分类接口
    confirmFn () {
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          // 通过校验
          if (this.isEdit) {
            this.addForm.id = this.editId
            const { data: res } = await updateArtCateAPI(this.addForm)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          } else {
            const { data: res } = await addArtCateAPI(this.addForm)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          }

          // 重新请求列表数据
          this.initCateListFn()
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    // 对话框取消按钮点击事件
    cancleFn () {
      this.dialogVisible = false
    },
    // 对话框关闭时的回调
    dialogColoseFn () {
      this.$refs.addRef.resetFields()
    },
    // 修改分类按钮迪点击事件
    updateCateBtnFn (obj) {
      this.isEdit = true
      this.editId = obj.id
      this.dialogVisible = true
      this.$nextTick(() => {
        // 数据回显
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    // 删除分类按钮点击事件
    async removeFn (obj) {
      const { data: res } = await delArtCateAPI(obj.id)
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
