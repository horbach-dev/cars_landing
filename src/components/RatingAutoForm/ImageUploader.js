import { Upload, Modal } from 'antd';
import styles from "./RatingAutoForm.module.css";
import React from "react";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class ImageDefault extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => {
        const { form, field } = this.props
        this.setState({ fileList })
        form.setFieldValue(field.name, fileList);
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const { form, field, name, label, placeholder } = this.props
        const uploadButton = (
            <div>
                <img src="/images/empty.svg" alt="Добавьте фото" width={82} />
                <div style={{ marginTop: 8, fontSize: 12, fontWeight: 500, color: '#555' }}>Кликните или перетащите сюда фотографии</div>
            </div>
        );

        // const error = form.errors[field.name] ? form.errors[field.name] : "";

        return (
          <span onClick={this.props.onClick} className={styles.uploaderWrap}>
           <span className={styles.uploaderLabel}>{label}</span>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                    multiple={true}
                >
                    {fileList.length >= 8 ? 'Достаточно' : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
          </span>
        );
    }
}

export default ImageDefault;
