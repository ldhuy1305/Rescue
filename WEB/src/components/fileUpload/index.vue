<script>
import axios from 'axios';
import template from './template.html';
import './style.scss';
export default {
    name: 'FileUpload',
    template: template,
    props: {
        maxSize: {
            type: Number,
            default: 5,
            required: true
        },
        accept: {
            type: String,
            default: 'image/*'
        },
        modelValue: {
            type: [String, Number, Object, File],
            default: ''
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            errors: [],
            isLoading: false,
            uploadReady: true,
            file: {
                name: '',
                size: 0,
                type: '',
                fileExtention: '',
                url: '',
                isImage: false,
                isUploaded: false
            }
        };
    },
    methods: {
        handleFileChange(e) {
            this.errors = [];
            // Check if file is selected
            if (e.target.files && e.target.files[0]) {
                // Check if file is valid
                this.publicId = e.target.files[0].name;
                if (this.isFileValid(e.target.files[0])) {
                    // Get uploaded file
                    const file = e.target.files[0],
                        // Get file size
                        fileSize =
                            Math.round((file.size / 1024 / 1024) * 100) / 100,
                        // Get file extention
                        fileExtention = file.name.split('.').pop(),
                        // Get file name
                        fileName = file.name.split('.').shift(),
                        // Check if file is an image
                        isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(
                            fileExtention
                        );
                    // Load the FileReader API
                    let reader = new FileReader();
                    reader.addEventListener(
                        'load',
                        () => {
                            // Set file data
                            this.file = {
                                name: fileName,
                                size: fileSize,
                                type: file.type,
                                fileExtention: fileExtention,
                                isImage: isImage,
                                url: reader.result,
                                isUploaded: true
                            };
                            this.uploadFile(file);
                        },
                        false
                    );
                    // Read uploaded file
                    reader.readAsDataURL(file);
                } else {
                    // console.log('Invalid file');
                }
            }
        },
        async uploadFile(file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'qfuacxsd'); // Replace with your upload preset

            this.uploading = true;
            this.uploadError = null;

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dcyg1qwdc/image/upload`,
                    formData
                );
                this.file.url = response.data.secure_url;
                this.$emit('update:modelValue', this.file.url);
            } catch (error) {
                this.uploadError = 'Error uploading file';
            } finally {
                this.uploading = false;
            }
        },
        isFileSizeValid(fileSize) {
            if (fileSize <= this.maxSize) {
                // console.log('File size is valid');
            } else {
                this.errors.push(
                    `Kích thước file phải nhỏ hơn ${this.maxSize} MB`
                );
            }
        },
        isFileTypeValid(fileExtention) {
            if (this.accept.split(',').includes(fileExtention)) {
                // console.log('File type is valid');
            } else {
                this.errors.push(`Kiểu file không phù hợp`);
            }
        },
        isFileValid(file) {
            this.isFileSizeValid(
                Math.round((file.size / 1024 / 1024) * 100) / 100
            );
            this.isFileTypeValid(file.name.split('.').pop());
            if (this.errors.length === 0) {
                return true;
            } else {
                return false;
            }
        },
        resetFileInput() {
            this.uploadReady = false;
            this.$nextTick(() => {
                this.uploadReady = true;
                this.file = {
                    name: '',
                    size: 0,
                    type: '',
                    data: '',
                    fileExtention: '',
                    url: '',
                    isImage: false,
                    isUploaded: false
                };
                this.$emit('update:modelValue', null);
            });
        }
    }
};
</script>
