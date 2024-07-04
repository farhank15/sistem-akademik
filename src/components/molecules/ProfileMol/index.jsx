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
              className="object-cover w-full h-full "
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
                    className="w-full textarea textarea-bordered"
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

            <div className="p-6 shadow-lg card bg-primary">
              <h2 className="text-2xl font-bold text-secondary">Skills</h2>
              <ul className="mt-2 ml-5 list-disc">
                <li>Languages: Python, JavaScript, Java, C++</li>
                <li>
                  Frameworks/Libraries: ReactJS, Node.js, Flask, TensorFlow,
                  Bootstrap
                </li>
                <li>Tools: Git, VS Code, Jupyter Notebook, Docker</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <div className="p-6 shadow-lg card bg-primary">
          <h2 className="text-2xl font-bold text-secondary">GitHub Stats</h2>
          <div className="mt-2">
            <p>Total Stars Earned: 4</p>
            <p>Total Commits (2024): 47</p>
            <p>Total PRs: 5</p>
            <p>Total Issues: 14</p>
            <p>Contributed to (last year): 1</p>
          </div>
        </div>

        <div className="p-6 shadow-lg card bg-base-100">
          <h2 className="text-2xl font-bold text-primary">
            Recent Contributions
          </h2>
          <div className="mt-2">
            <img
              src="/path_to_your_contributions_image"
              alt="Contributions"
              className="w-full"
            />{" "}
            {/* Update with the correct path */}
          </div>
        </div>

        <div className="p-6 shadow-lg card bg-base-100">
          <h2 className="text-2xl font-bold text-primary">
            Popular Repositories
          </h2>
          <ul className="mt-2 ml-5 list-disc">
            <li>
              <a
                href="https://github.com/farhank15/Profil-me-farhank"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent"
              >
                Profil-me-farhank
              </a>
            </li>
            <li>
              <a
                href="https://github.com/farhank15/Health-Directions-App"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent"
              >
                Health-Directions-App
              </a>
            </li>
            <li>
              <a
                href="https://github.com/farhank15/Stuntguard-App"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent"
              >
                Stuntguard-App
              </a>
            </li>
            <li>
              <a
                href="https://github.com/farhank15/building-material-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent"
              >
                building-material-app
              </a>
            </li>
          </ul>
        </div>

        <div className="p-6 shadow-lg card bg-base-100">
          <h2 className="text-2xl font-bold text-primary">Let's Connect</h2>
          <ul className="mt-2 ml-5 list-disc">
            <li>
              <a href="mailto:farhank22@gmail.com" className="text-accent">
                Email: farhank22@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/farhank15"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileMol;
