import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import FormInput from "@components/atoms/FormInput";
import gambar from "@assets/images/fototest.jpeg";

const ProfileMol = () => {
  const [profileImage, setProfileImage] = useState(gambar);
  const [formData] = useState({
    birthPlace: "Lamongan",
    birthDate: "2003-02-25",
    address:
      "RT01/RW03, Dsn.Ngablak Ds.Prijekngablak kec.Karanggeneng Kab.Lamongan Jawa timur, RT/RW: 0/0, Kode Pos: 0",
    gender: "Laki-laki",
    religion: "Islam",
    status: "Belum menikah",
    nationality: "WNI",
    education: "SMAN 1 SEKARAN",
    major: "MIPA",
    email: "farhank22@gmail.com",
    phone: "081234567890",
    studyProgram: "Teknologi Informasi",
    faculty: "Fakultas Teknologi Informasi",
    curriculumYear: "2020",
    credits: "144",
    batch: "2020",
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen p-5 text-neutral-content font-poppins">
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
        <div className="relative flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4 overflow-hidden rounded-full md:w-80 md:h-80">
            <img
              src={profileImage}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <label
            htmlFor="file-input"
            className="absolute p-2 transform translate-y-2 rounded-full cursor-pointer right-20 top-32 md:top-56 md:right-2 bg-primary"
          >
            <FiEdit className="text-white" size={24} />
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <h1 className="mt-4 text-3xl font-bold text-secondary">
            Ahmad Farhan Kholik
          </h1>
          <p className="text-sm text-secondary">21450410030</p>

          <div className="w-full mt-6 space-y-6">
            <div className="w-[22rem] md:w-auto p-6 border shadow-lg card border-neutral">
              <h2 className="text-2xl font-bold text-secondary">
                Detail Lainnya
              </h2>
              <hr className="my-2 border-t border-neutral" />
              <form className="w-full space-y-4">
                <FormInput
                  label="Email"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Nomor HP"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Program Studi"
                  type="text"
                  name="studyProgram"
                  value={formData.studyProgram}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Fakultas"
                  type="text"
                  name="faculty"
                  value={formData.faculty}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Tahun Kurikulum"
                  type="text"
                  name="curriculumYear"
                  value={formData.curriculumYear}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="SKS Saat Ini"
                  type="text"
                  name="credits"
                  value={formData.credits}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Angkatan"
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start md:flex-row md:space-x-6">
          <div className="flex flex-col items-center md:items-start"></div>
          <div className="w-full mt-6 space-y-6 md:mt-0">
            <div className="xl:w-[55rem] p-6 border shadow-lg card border-neutral">
              <h2 className="text-2xl font-bold text-secondary">
                Tentang Saya
              </h2>
              <hr className="my-2 border-t border-neutral" />
              <form className="w-full space-y-4">
                <FormInput
                  label="Tempat Lahir"
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Tanggal Lahir"
                  type="text"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <div className="w-full form-control">
                  <label className="label">
                    <span className="label-text">Alamat (KTP)</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={() => {}}
                    className="w-full textarea text-neutral-light textarea-bordered"
                    disabled
                  />
                </div>
                <FormInput
                  label="Jenis Kelamin"
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Agama"
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Status"
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Kewarganegaraan"
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Pendidikan Terakhir"
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
                <FormInput
                  label="Jurusan"
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={() => {}}
                  className="w-full"
                  disabled
                />
              </form>
            </div>

            <div className=" flex flex-col space-y-6 h-[180px] md:space-y-0 md:flex-row md:space-x-6">
              <div className="w-full p-6 transition-transform duration-500 border-2 shadow-lg hover:scale-105 border-primary-light bg-base-100 card">
                <h2 className="text-2xl font-bold text-secondary">
                  Status Mahasiswa
                </h2>
                <p className="mt-2">Aktif, Semester 4</p>
                <p className="mt-2">Wali Dosen: Dr. John Doe</p>
              </div>

              <div className="w-full p-6 transition-transform duration-500 border shadow-lg card bg-primary hover:scale-105 border-neutral">
                <img src="" alt="KTM" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMol;
