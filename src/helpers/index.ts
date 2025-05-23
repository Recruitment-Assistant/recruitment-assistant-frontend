export const convertEnumToComboboxType = (payload: object) => {
	return Object.values(payload).map((value) => ({
		label: value.replace(/_/g, ' '),
		value,
	}));
};

const formatFileSize = (bytes: number) => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getAnalysisStageLabel = (stage: string): string => {
	switch (stage) {
		case 'reading':
			return 'Reading document content';
		case 'uploading':
			return 'Uploading resume file';
		case 'extracting':
			return 'Extracting key information';
		case 'analyzing':
			return 'Analyzing skills and experience';
		case 'complete':
			return 'Analysis complete';
		case 'failed':
			return 'Analysis failed';
		default:
			return 'Ready to analyze';
	}
};
