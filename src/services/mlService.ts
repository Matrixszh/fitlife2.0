// Service to interact with the Java ML backend
// This will call a REST API endpoint that runs the WEKA model

export interface MLPredictionRequest {
  duration: number;
  distance?: number;
  calories: number;
}

export interface MLPredictionResponse {
  predictedActivity: string;
  confidence?: number;
  isMLPrediction?: boolean;
}

// ML Service endpoint - update this to match your Java server URL
const ML_API_URL = import.meta.env.VITE_ML_API_URL || 'http://localhost:8080/api/predict';

/**
 * Predict activity type using the ML model
 * Requires the ML Java backend to be running on port 8080
 */
export const predictActivityType = async (
  data: MLPredictionRequest
): Promise<MLPredictionResponse> => {
  try {
    // Call the Java ML backend - no fallback, must be connected
    const response = await fetch(ML_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        duration: data.duration,
        distance: data.distance || 0,
        calories: data.calories,
      }),
    });

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `ML service error (${response.status})`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    
    if (!result.predictedActivity) {
      throw new Error('Invalid response from ML service');
    }

    return {
      predictedActivity: result.predictedActivity,
      confidence: result.confidence,
      isMLPrediction: true,
    };
  } catch (error: any) {
    // Network errors (server not running, connection refused, etc.)
    if (error.name === 'TypeError' || error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      throw new Error(
        'ML service is not running. Please start the Java ML server on port 8080. ' +
        'Run: cd ml-component && mvn exec:java "-Dexec.mainClass=com.fitlife.ml.MLServer"'
      );
    }
    // Re-throw other errors
    throw error;
  }
};

