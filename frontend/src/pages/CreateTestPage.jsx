// File: frontend/src/pages/CreateTestPage.jsx
// ĐÃ SỬA LỖI: Tạm thời gỡ bỏ logic check token để test
import React, { useState, useRef, useEffect } from 'react';

// --- Các component SVG Icons và CssSwitch (Giữ nguyên) ---
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '2.5rem', width: '2.5rem', color: '#6B7280' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);
const SpinnerIcon = () => (
  <svg style={{ animation: 'spin 1s linear infinite', height: '1.25rem', width: '1.25rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);
const CssSwitch = ({ id, label, checked, onChange }) => {
  const switchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '44px',
    height: '24px',
  };
  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: checked ? '#2563EB' : '#ccc',
    transition: '.4s',
    borderRadius: '24px',
  };
  const sliderBeforeStyle = {
    position: 'absolute',
    content: '""',
    height: '18px',
    width: '18px',
    left: '3px',
    bottom: '3px',
    backgroundColor: 'white',
    transition: '.4s',
    borderRadius: '50%',
    transform: checked ? 'translateX(20px)' : 'translateX(0)',
  };
  return (
    <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer' }}>
      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>{label}</span>
      <div style={switchStyle}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={sliderStyle}>
          <span style={sliderBeforeStyle}></span>
        </span>
      </div>
    </label>
  );
};
// --- Hết Component Switch ---


// --- Định nghĩa các Style (CSS-in-JS) ---
const styles = {
  pageContainer: { backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' },
  header: { backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', padding: '24px', borderBottom: '1px solid #E5E7EB' },
  headerTitle: { fontSize: '1.5rem', fontWeight: '600', color: '#111827' },
  contentContainer: { padding: '32px' },
  formContainer: { display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto' },
  card: { backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', border: '1px solid #E5E7EB', marginBottom: '24px' },
  cardTitle: { fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '24px' },
  formGroup: { marginBottom: '16px' },
  formLabel: { display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '4px' },
  formInput: { width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '6px', backgroundColor: '#F9FAFB', boxSizing: 'border-box', color: '#111827' },
  checkboxLabel: { display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#374151', marginBottom: '12px' },
  checkboxInput: { height: '1rem', width: '1rem', marginRight: '12px' },
  radioCard: { display: 'flex', padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer', marginBottom: '12px' },
  radioCardSelected: { display: 'flex', padding: '16px', border: '1px solid #2563EB', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#EFF6FF', marginBottom: '12px' },
  radioInput: { marginTop: '3px', marginRight: '12px' },
  radioCardTitle: { display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#111827' },
  radioCardDesc: { display: 'block', fontSize: '0.875rem', color: '#6B7280' },
  fileUploadBox: { marginTop: '4px', display: 'flex', justifyContent: 'center', padding: '32px 24px', border: '2px dashed #D1D5DB', borderRadius: '8px', cursor: 'pointer', textAlign: 'center' },
  fileUploadContent: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  fileUploadTextPrimary: { fontWeight: '500', color: '#374151', marginTop: '16px' },
  fileUploadTextSecondary: { fontSize: '0.875rem', color: '#6B7280', marginTop: '4px' },
  reviewQuestionCard: { backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '6px', border: '1px solid #E5E7EB', marginBottom: '16px' },
  reviewQuestionTitle: { fontSize: '0.875rem', fontWeight: '600', color: '#1F2937', marginBottom: '12px' },
  reviewOption: { padding: '8px', borderRadius: '6px', border: '1px solid #E5E7EB', backgroundColor: 'white', marginBottom: '8px', fontSize: '0.875rem' },
  reviewOptionCorrect: { padding: '8px', borderRadius: '6px', border: '1px solid #34D399', backgroundColor: '#D1FAE5', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' },
  reviewPrompt: { backgroundColor: '#E5E7EB', padding: '12px', borderRadius: '6px', fontSize: '0.875rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' },
  buttonContainer: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center' },
  buttonGhost: { padding: '8px 16px', borderRadius: '6px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', backgroundColor: 'white', color: '#374151', border: '1px solid #D1D5DB', marginRight: '16px' },
  buttonPrimary: { padding: '8px 16px', borderRadius: '6px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', backgroundColor: '#2563EB', color: 'white', border: '1px solid transparent' },
  buttonDisabled: { padding: '8px 16px', borderRadius: '6px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', fontWeight: '500', cursor: 'not-allowed', backgroundColor: '#9CA3AF', color: 'white', border: '1px solid transparent' },
  saveMessage: { fontSize: '0.875rem', marginRight: '16px', color: '#10B981' },
  errorMessage: { fontSize: '0.875rem', marginRight: '16px', color: '#EF4444' }
};


// --- Component Chính ---
export default function CreateTestPage() {
  // State quản lý form
  const [assessmentName, setAssessmentName] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [securitySettings, setSecuritySettings] = useState({
    enableAI: false,
    enableWebcam: false,
    enableScreen: false,
    lockBrowser: false,
  });

  // State nghiệp vụ
  const [testType, setTestType] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // Đọc file
  const [parsedQuestions, setParsedQuestions] = useState([]);

  // State API
  const [isSaving, setIsSaving] = useState(false); // Lưu lên DB
  const [saveMessage, setSaveMessage] = useState('');
  const [saveError, setSaveError] = useState(false);

  // --- (ĐÃ XÓA LOGIC LẤY TOKEN) ---
  // const [authToken, setAuthToken] = useState('');
  // useEffect(() => { ... }, []);


  // --- Hàm xử lý Checkbox (Giữ nguyên) ---
  const handleSecurityChange = (e) => {
    const { id, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [id]: checked,
    }));
  };

  // --- HÀM UPLOAD FILE (ĐÃ XÓA CHECK TOKEN) ---
  const handleFileUpload = async (file) => {
    // if (!authToken) { ... } // (Đã xóa)
    
    setUploadedFile(file);
    setIsLoading(true);
    setParsedQuestions([]);
    setSaveMessage('');
    setSaveError(false);

    const formData = new FormData();
    formData.append('testFile', file);
    formData.append('testType', testType);

    try {
      const response = await fetch('http://localhost:3001/api/tests/parse-upload', {
        method: 'POST',
        headers: {
          // 'x-auth-token': authToken, // (Đã xóa)
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Lỗi từ máy chủ');
      }

      const parsedData = await response.json();
      setParsedQuestions(parsedData);

    } catch (error) {
      console.error('Không thể đọc file:', error);
      setSaveError(true);
      setSaveMessage(`Lỗi đọc file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Hàm này được gọi khi người dùng chọn file
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // --- HÀM GỌI API BACKEND (ĐÃ XÓA CHECK TOKEN) ---
  const handleSave = async (status) => {
    // if (!authToken) { ... } // (Đã xóa)

    if (!assessmentName || !timeLimit || !testType || parsedQuestions.length === 0) {
      setSaveError(true);
      setSaveMessage('Vui lòng điền đủ thông tin, chọn loại test và tải lên câu hỏi.');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');
    setSaveError(false);

    const testData = {
      assessmentName,
      timeLimit: parseInt(timeLimit, 10),
      securitySettings,
      testType,
      questions: parsedQuestions, 
      status: status,
    };

    try {
      const response = await fetch('http://localhost:3001/api/tests/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'x-auth-token': authToken, // (Đã xóa)
        },
        body: JSON.stringify(testData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Lỗi từ máy chủ');
      }

      const result = await response.json();
      console.log('Lưu thành công:', result);

      setSaveError(false);
      setSaveMessage(status === 'DRAFT' ? 'Đã lưu nháp thành công!' : 'Đã đăng tải bài test!');
      
    } catch (error) {
      console.error('Không thể lưu:', error);
      setSaveError(true);
      setSaveMessage(`Lỗi khi lưu: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // --- RENDER GIAO DIỆN (Đã dịch) ---
  return (
    <div style={styles.pageContainer}>
      {/* --- Header --- */}
      <header style={styles.header}>
        <h2 style={styles.headerTitle}>
          Tạo Bài Đánh Giá Mới
        </h2>
      </header>

      {/* --- Main Content (Form) --- */}
      <div style={styles.contentContainer}>
        <div style={styles.formContainer}>

          {/* --- Card 1: Test Details --- */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Thông Tin Bài Test</h3>
            <div>
              <div style={styles.formGroup}>
                <label htmlFor="assessment-name" style={styles.formLabel}>Tên Bài Đánh Giá <span style={{ color: '#EF4444' }}>*</span></label>
                <input
                  type="text"
                  id="assessment-name"
                  placeholder="Ví dụ: Bài test Junior Marketer"
                  style={styles.formInput}
                  className="my-form-input"
                  value={assessmentName}
                  onChange={(e) => setAssessmentName(e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="time-limit" style={styles.formLabel}>Thời Gian (phút) <span style={{ color: '#EF4444' }}>*</span></label>
                <input
                  type="number"
                  id="time-limit"
                  placeholder="Ví dụ: 45"
                  style={styles.formInput}
                  className="my-form-input"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* --- Card 2: Security & Proctoring --- */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Bảo Mật & Chống Gian Lận</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ marginBottom: '12px' }}>
                <CssSwitch
                  id="enableAI"
                  label="Bật Chống Gian Lận AI (Proctoring)"
                  checked={securitySettings.enableAI}
                  onChange={handleSecurityChange}
                />
              </div>
              
              <label style={{...styles.checkboxLabel, opacity: securitySettings.enableAI ? 1 : 0.5}}>
                <input
                  type="checkbox"
                  id="enableWebcam"
                  style={styles.checkboxInput}
                  checked={securitySettings.enableWebcam}
                  onChange={handleSecurityChange}
                  disabled={!securitySettings.enableAI}
                />
                <span>Bật Giám Sát Webcam</span>
              </label>
              <label style={{...styles.checkboxLabel, opacity: securitySettings.enableAI ? 1 : 0.5}}>
                <input
                  type="checkbox"
                  id="enableScreen"
                  style={styles.checkboxInput}
                  checked={securitySettings.enableScreen}
                  onChange={handleSecurityChange}
                  disabled={!securitySettings.enableAI}
                />
                <span>Bật Quay Màn Hình</span>
              </label>
              <label style={{...styles.checkboxLabel, opacity: securitySettings.enableAI ? 1 : 0.5}}>
                <input
                  type="checkbox"
                  id="lockBrowser"
                  style={styles.checkboxInput}
                  checked={securitySettings.lockBrowser}
                  onChange={handleSecurityChange}
                  disabled={!securitySettings.enableAI}
                />
                <span>Khóa Trình Duyệt (Chế độ toàn màn hình)</span>
              </label>
            </div>
          </div>

          {/* --- Card 3: CHỌN LOẠI TEST --- */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>1. Chọn Loại Test <span style={{ color: '#EF4444' }}>*</span></h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              <label
                style={testType === 'mcq' ? styles.radioCardSelected : styles.radioCard}
                onClick={() => { setTestType('mcq'); setUploadedFile(null); setParsedQuestions([]); }}
              >
                <input type="radio" name="test-type" value="mcq" checked={testType === 'mcq'} onChange={() => {}} style={styles.radioInput} />
                <div>
                  <span style={styles.radioCardTitle}>Test Trắc Nghiệm (Multiple Choice)</span>
                  <span style={styles.radioCardDesc}>Bài test trắc nghiệm (chọn 1 đáp án đúng).</span>
                </div>
              </label>
              
              <label
                style={testType === 'practical' ? styles.radioCardSelected : styles.radioCard}
                onClick={() => { setTestType('practical'); setUploadedFile(null); setParsedQuestions([]); }}
              >
                <input type="radio" name="test-type" value="practical" checked={testType === 'practical'} onChange={() => {}} style={styles.radioInput} />
                <div>
                  <span style={styles.radioCardTitle}>Test Thực Hành / Case Study</span>
                  <span style={styles.radioCardDesc}>Bài test tự luận, phân tích tình huống, viết code...</span>
                </div>
              </label>
              
              <label
                style={testType === 'iq' ? styles.radioCardSelected : styles.radioCard}
                onClick={() => { setTestType('iq'); setUploadedFile(null); setParsedQuestions([]); }}
              >
                <input type="radio" name="test-type" value="iq" checked={testType === 'iq'} onChange={() => {}} style={styles.radioInput} />
                <div>
                  <span style={styles.radioCardTitle}>Test IQ / Logic</span>
                  <span style={styles.radioCardDesc}>Bài test logic, toán đố (tương tự trắc nghiệm).</span>
                </div>
              </label>

            </div>
          </div>

          {/* --- Card 4: TẢI LÊN FILE (CÓ ĐIỀU KIỆN) --- */}
          {testType && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>2. Tải Lên Câu Hỏi <span style={{ color: '#EF4444' }}>*</span></h3>
              
              <div
                style={styles.fileUploadBox}
                onClick={triggerFileInput}
              >
                <div style={styles.fileUploadContent}> {/* Sửa lại wrapper */}
                  <UploadIcon />
                  <span style={styles.fileUploadTextPrimary}>
                    {uploadedFile ? uploadedFile.name : 'Nhấn hoặc kéo file .txt vào khu vực này'}
                  </span>
                  <span style={styles.fileUploadTextSecondary}>
                    Chỉ hỗ trợ file .txt theo định dạng mẫu.
                  </span>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                accept=".txt" // Chỉ chấp nhận file .txt
              />
              

              {isLoading && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px' }}>
                  <SpinnerIcon />
                  <span style={{ marginLeft: '12px', fontSize: '0.875rem', color: '#374151' }}>Đang đọc file và phân tích câu hỏi...</span>
                </div>
              )}
            </div>
          )}

          {/* --- Card 5: DUYỆT FORM ĐÃ LOAD (CÓ ĐIỀU KIỆN) --- */}
          {parsedQuestions.length > 0 && !isLoading && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>3. Xem Trước (Review) Câu Hỏi Đã Tải Lên</h3>
              <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '16px' }}>Đây là những gì hệ thống đã đọc được từ file. Vui lòng kiểm tra lại trước khi đăng tải.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {parsedQuestions.map((q, index) => (
                  <div key={q.id || index} style={styles.reviewQuestionCard}> {/* Thêm index làm key dự phòng */}
                    <h4 style={styles.reviewQuestionTitle}>Câu {index + 1}: {q.title || q.question}</h4>
                    
                    {q.type === 'practical' ? (
                      <pre style={styles.reviewPrompt}>
                        {q.prompt}
                      </pre>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {q.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            style={optIndex === q.correctAnswer ? styles.reviewOptionCorrect : styles.reviewOption}
                          >
                            <p>{option}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- Nút Bấm Cuối trang (ĐÃ SỬA LOGIC DISABLED) --- */}
          <div style={{ ...styles.buttonContainer, marginBottom: '24px' }}>
            {isSaving ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SpinnerIcon />
                <span style={{...styles.saveMessage, color: '#374151', marginLeft: '8px'}}>Đang lưu...</span>
              </div>
            ) : (
              // Hiển thị thông báo lỗi hoặc thành công
              <span style={saveError ? styles.errorMessage : styles.saveMessage}>{saveMessage}</span>
            )}

            <button
              type="button"
              style={isSaving ? styles.buttonDisabled : styles.buttonGhost} // Chỉ vô hiệu hóa khi đang lưu
              onClick={() => handleSave('DRAFT')}
              disabled={isSaving}
            >
              Lưu Nháp
            </button>
            <button
              type="button"
              style={isSaving ? styles.buttonDisabled : styles.buttonPrimary} // Chỉ vô hiệu hóa khi đang lưu
              onClick={() => handleSave('PUBLISHED')}
              disabled={isSaving}
            >
              Đăng Tải Test
            </button>
          </div>

        </div>
      </div>
      
      {/* Thẻ <style> MỚI ĐỂ SỬA LỖI */}
      <style>{`
        /* 1. Sửa lỗi placeholder không hiển thị */
        .my-form-input::placeholder {
          color: #9CA3AF;
          opacity: 1;
        }
        
        /* 2. Sửa màu checkbox và radio */
        input[type="checkbox"], input[type="radio"] {
          accent-color: #2563EB;
        }
        
        /* 3. Keyframe cho animation spin */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}