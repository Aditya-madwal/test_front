import React, { useState, useRef } from 'react';
import { Upload, Loader2, X } from 'lucide-react';
import { StudyAreaService } from '../../lib/api/StudyAreaDashboard.jsx/StudyAreaServices';
import { toast } from 'react-hot-toast';
import { useParams } from "react-router-dom";

const ConfirmationModal = ({ isOpen, onClose, files, onConfirm, isUploading }) => {
    console.log('Rendering ConfirmationModal:', { isOpen, files });
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Confirm Upload</h3>
                    <button onClick={onClose} disabled={isUploading}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="mb-4">
                    <p className="text-gray-600 mb-2">Selected files to upload:</p>
                    <ul className="max-h-40 overflow-y-auto">
                        {files.map((file, index) => (
                            <li key={index} className="text-sm text-gray-700 py-1">
                                {file.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isUploading}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        Cancel
                    </button>
                    
                    <button
                        onClick={onConfirm}
                        disabled={isUploading}
                        className="px-4 py-2 bg-purple-600 text-white text-sm rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                        {isUploading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading...
                            </div>
                        ) : (
                            'Confirm Upload'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};


const FileUpload = ({ fetchRoadmapPDFs }) => {
    const { uid } = useParams();
    const [roadmapUid, setRoadmapUid] = useState(uid);
    console.log('Rendering FileUpload component with roadmapUid:', roadmapUid);
    
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileInput = (e) => {
        console.log('File input change detected');
        const files = Array.from(e.target.files);
        processFiles(files);
    };

    const processFiles = (files) => {
        console.log('Processing files:', files);
        const pdfFiles = files.filter(file => file.type === 'application/pdf');
        
        if (pdfFiles.length === 0) {
            console.log('No PDF files found in selection');
            toast.error('Please select PDF files only');
            return;
        }
        
        console.log('Valid PDF files:', pdfFiles);
        setSelectedFiles(pdfFiles);
        setIsModalOpen(true);
    };

    const handleUpload = async () => {
        console.log('Starting upload process');
        
        if (!roadmapUid) {
            console.error('No roadmap UID provided');
            toast.error('No roadmap selected');
            return;
        }

        setIsUploading(true);
        try {
            for (const file of selectedFiles) {
                console.log('Uploading file:', file.name);
                const pdfData = { file };
                await StudyAreaService.uploadPDF(roadmapUid, pdfData);
                console.log('Successfully uploaded:', file.name);
                toast.success(`Successfully uploaded ${file.name}`);
            }
            setSelectedFiles([]);
            setIsModalOpen(false);
            fetchRoadmapPDFs();
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error.response?.data?.message || 'Failed to upload file');
        } finally {
            console.log('Upload process completed');
            setIsUploading(false);
        }
    };

    const handleClick = () => {
        console.log('Triggering file input click');
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full mx-auto mb-4">
            <h2 className="text-xl font-semibold mb-4">
                Upload PDF notes for AI Summarization
            </h2>

            <div
                onClick={handleClick}
                className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors border-gray-300 hover:border-blue-400"
            >
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Upload className="w-6 h-6 text-blue-500" />
                </div>

                <p className="text-gray-700 mb-2">
                    Click here to upload files
                </p>

                <p className="text-gray-500 text-sm mt-2">
                    Support .pdf files
                </p>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                />
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => {
                    console.log('Closing confirmation modal');
                    setIsModalOpen(false);
                    setSelectedFiles([]);
                }}
                files={selectedFiles}
                onConfirm={handleUpload}
                isUploading={isUploading}
            />
        </div>
    );
};

export default FileUpload;
