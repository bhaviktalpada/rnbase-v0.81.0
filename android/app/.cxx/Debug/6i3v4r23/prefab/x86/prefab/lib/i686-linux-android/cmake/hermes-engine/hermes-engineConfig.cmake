if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/Mackbook/.gradle/caches/8.14.3/transforms/8b5f89b54bcb42e2e7d7af962fba8fe2/transformed/hermes-android-0.81.5-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/Mackbook/.gradle/caches/8.14.3/transforms/8b5f89b54bcb42e2e7d7af962fba8fe2/transformed/hermes-android-0.81.5-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

