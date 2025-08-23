// import { UploadImage } from "../FetchAdmin/Products.js";

function Image() {
  const formAdminProduct = async (data) => {
    const formData = new FormData();
    formData.append("UrlImagen", files);

    await CreateProductAdmin(formData);
    reset();
    setFiles("");
    alertasUpp();
    setSpinner(false);

    return {};
  };

  return (
    <>
      <div className="Image">
        <form>
          <input
            type="file"
            name="file"
            onChange={(e) => picture.setFieldValue("file", e.target.files[0])}
          />
          <button type="Submit"> Cargar Imagen</button>
        </form>
        <div className="d-flex justify-content-center mt-3">
          {files && (
            <img
              className="card w-50"
              src={URL.createObjectURL(files)}
              alt={files.name}
            />
          )}
        </div>
      </div>
    </>
  );
}

export { Image };
